import StaggeredMenu from './CustomMenu';

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home', link: '#hero' },
    { label: 'Projects', ariaLabel: 'View projects', link: '#projects' },
    { label: 'Stack', ariaLabel: 'View tech stack', link: '#stack' },
    { label: 'Experience', ariaLabel: 'View experience', link: '#experience' },
    { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
    { label: 'GitHub', link: 'https://github.com/mahmoodiftee' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/mahmoodiffty' },
    { label: 'Facebook', link: 'https://www.facebook.com/mahmood.iftee00' },
];

export default function Menu() {
    return (
        <StaggeredMenu
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            colors={['#B19EEF', '#5227FF']}
            accentColor="#ffdb29"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
        />

    );
}