import { useCallback, useMemo } from 'react';
   import { Box } from '@mui/material';
   import { createEditor, Transforms, Editor, Element } from 'slate';
   import { Slate, Editable, withReact } from 'slate-react';
   import { withHistory } from 'slate-history';

   function RichTextEditor({
     value,
     onChange,
     fontStyle,
     fontSize,
     color,
     lineSpacing,
     sideMargin,
     placeholder = 'Enter text...',
   }) {
     const editor = useMemo(() => withHistory(withReact(createEditor())), []);

     // Convert plain text or invalid JSON to Slate JSON format
     const parseValue = (input) => {
       try {
         if (!input || typeof input !== 'string') {
           return [{ type: 'paragraph', children: [{ text: '' }] }];
         }
         const parsed = JSON.parse(input);
         // Ensure parsed value is a valid Slate node array
         if (Array.isArray(parsed) && parsed.every(node => node.type && node.children)) {
           return parsed;
         }
         // If parsed value is invalid, treat input as plain text
         return [{ type: 'paragraph', children: [{ text: input }] }];
       } catch (error) {
         // If JSON.parse fails, treat input as plain text
         console.warn('Invalid JSON for Slate editor, converting to plain text:', input, error);
         return [{ type: 'paragraph', children: [{ text: input || '' }] }];
       }
     };

     const initialValue = parseValue(value);

     const renderElement = useCallback((props) => {
       switch (props.element.type) {
         case 'paragraph':
           return <p {...props.attributes}>{props.children}</p>;
         case 'bulleted-list':
           return <ul {...props.attributes}>{props.children}</ul>;
         case 'list-item':
           return <li {...props.attributes}>{props.children}</li>;
         default:
           return <p {...props.attributes}>{props.children}</p>;
       }
     }, []);

     const renderLeaf = useCallback(
       (props) => {
         let style = {};
         if (props.leaf.bold) style.fontWeight = 'bold';
         if (props.leaf.italic) style.fontStyle = 'italic';
         if (props.leaf.underline) style.textDecoration = 'underline';
         return (
           <span {...props.attributes} style={style}>
             {props.children}
           </span>
         );
       },
       []
     );

     const toggleMark = (editor, format) => {
       const isActive = isMarkActive(editor, format);
       if (isActive) {
         Editor.removeMark(editor, format);
       } else {
         Editor.addMark(editor, format, true);
       }
     };

     const isMarkActive = (editor, format) => {
       const marks = Editor.marks(editor);
       return marks ? marks[format] === true : false;
     };

     const toggleBlock = (editor, format) => {
       const isActive = isBlockActive(editor, format);
       const isList = format === 'bulleted-list';

       Transforms.unwrapNodes(editor, {
         match: (n) =>
           !Editor.isEditor(n) && Element.isElement(n) && n.type === 'bulleted-list',
         mode: 'all',
       });

       const newProperties = {
         type: isActive ? 'paragraph' : isList ? 'list-item' : format,
       };
       Transforms.setNodes(editor, newProperties);

       if (!isActive && isList) {
         const block = { type: 'bulleted-list', children: [] };
         Transforms.wrapNodes(editor, block);
       }
     };

     const isBlockActive = (editor, format) => {
       const [match] = Editor.nodes(editor, {
         match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
       });
       return !!match;
     };

     return (
       <Box
         sx={{
           marginLeft: `${sideMargin}px`,
           marginRight: `${sideMargin}px`,
           lineHeight: lineSpacing,
           border: '1px solid #e0e0e0',
           borderRadius: '4px',
           '& .slate-editor': {
             fontFamily: fontStyle,
             fontSize: `${fontSize}px`,
             color,
             lineHeight: lineSpacing,
             minHeight: '150px',
             maxHeight: '300px',
             overflowY: 'auto',
             padding: '8px',
           },
           '& .slate-toolbar': {
             borderBottom: '1px solid #e0e0e0',
             padding: '4px',
             backgroundColor: '#f5f5f5',
             borderRadius: '4px 4px 0 0',
           },
         }}
       >
         <Slate
           editor={editor}
           initialValue={initialValue}
           onChange={(newValue) => {
             onChange(JSON.stringify(newValue));
           }}
         >
           <Box className="slate-toolbar">
             <button
               type="button"
               onMouseDown={(event) => {
                 event.preventDefault();
                 toggleMark(editor, 'bold');
               }}
               style={{ margin: '0 4px' }}
             >
               <strong>B</strong>
             </button>
             <button
               type="button"
               onMouseDown={(event) => {
                 event.preventDefault();
                 toggleMark(editor, 'italic');
               }}
               style={{ margin: '0 4px' }}
             >
               <em>I</em>
             </button>
             <button
               type="button"
               onMouseDown={(event) => {
                 event.preventDefault();
                 toggleMark(editor, 'underline');
               }}
               style={{ margin: '0 4px' }}
             >
               <u>U</u>
             </button>
             <button
               type="button"
               onMouseDown={(event) => {
                 event.preventDefault();
                 toggleBlock(editor, 'bulleted-list');
               }}
               style={{ margin: '0 4px' }}
             >
               • List
             </button>
           </Box>
           <Editable
             className="slate-editor"
             renderElement={renderElement}
             renderLeaf={renderLeaf}
             placeholder={placeholder}
             onKeyDown={(event) => {
               if (event.ctrlKey || event.metaKey) {
                 switch (event.key) {
                   case 'b':
                     event.preventDefault();
                     toggleMark(editor, 'bold');
                     break;
                   case 'i':
                     event.preventDefault();
                     toggleMark(editor, 'italic');
                     break;
                   case 'u':
                     event.preventDefault();
                     toggleMark(editor, 'underline');
                     break;
                   default:
                     break;
                 }
               }
             }}
           />
         </Slate>
       </Box>
     );
   }

   export default RichTextEditor;