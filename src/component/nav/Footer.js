import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    // Navigation links for footer
    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'Create Resume', path: '/create-resume' },
        { title: 'About', path: '/about' },
    ];

    // Social media links (placeholders)
    const socialLinks = [
        { title: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com' },
        { title: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com' },
        { title: 'Email', icon: <EmailIcon />, url: 'mailto:support@freeresume.com' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#1e3a8a',
                color: 'white',
                py: 6,
                px: 4,
                mt: 'auto',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 4,
                }}
            >
                {/* Brand and Mission */}
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', mb: 2 }}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        FreeResume
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: '300px', lineHeight: 1.6 }}>
                        Empowering college students and beginners with free, ATS-optimized resume tools to land their dream jobs.
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Quick Links
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {navLinks.map((link) => (
                            <MuiLink
                                key={link.title}
                                component={Link}
                                to={link.path}
                                color="inherit"
                                underline="none"
                                sx={{ display: 'block' }}
                            >
                                <motion.div
                                    whileHover={{ x: 5, color: '#10b981' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {link.title}
                                </motion.div>
                            </MuiLink>
                        ))}
                    </Box>
                </Box>

                {/* Social Media and Contact */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Connect With Us
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {socialLinks.map((social) => (
                            <MuiLink
                                key={social.title}
                                href={social.url}
                                color="inherit"
                                underline="none"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, color: '#10b981' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {social.icon}
                                    {social.title}
                                </motion.div>
                            </MuiLink>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />

            {/* Copyright */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} FreeResume. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;