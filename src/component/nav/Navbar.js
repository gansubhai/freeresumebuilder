import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation links data
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Create Resume', path: '/create-resume' },
    { title: 'About', path: '/about' },
  ];

  // Drawer content for mobile menu
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#1e3a8a', height: '100%', pt: 4 }}>
      <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
        FreeResume
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} component={Link} to={item.path} sx={{ color: 'white', py: 1.5 }}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'transparent', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }}>
      <Toolbar sx={{ bgcolor: 'rgba(17, 24, 39, 0.8)', py: 1 }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}
        >
          <Link to="/" className="text-white text-decoration-none">
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              FreeResume
            </motion.span>
          </Link>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navLinks.map((item) => (
            <Button
              key={item.title}
              color="inherit"
              component={Link}
              to={item.path}
              sx={{ color: 'white', fontWeight: 'medium', textTransform: 'none', fontSize: '1rem' }}
            >
              <motion.div
                whileHover={{ y: -2, color: '#10b981' }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.div>
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' }, color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: '70%', maxWidth: '300px', bgcolor: '#1e3a8a' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;