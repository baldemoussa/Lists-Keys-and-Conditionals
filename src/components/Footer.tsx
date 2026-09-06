function Footer({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <footer
            className={`w-full border-t px-4 py-5 text-center transition-colors duration-300 ${
                isDarkMode
                    ? 'border-slate-700 bg-slate-900 text-slate-300'
                    : 'border-slate-200 bg-slate-100 text-slate-600'
            }`}
        >
            <p className="m-0">© {new Date().getFullYear()} Task Management by Mamadou Moussa Balde. All rights reserved.</p>
        </footer>
    );
}

export default Footer;