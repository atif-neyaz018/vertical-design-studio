import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfC3sxQvU2dpSRZpQKLua_Kf8xJia9_p4",
    authDomain: "vertical-design-studio.firebaseapp.com",
    projectId: "vertical-design-studio",
    storageBucket: "vertical-design-studio.firebasestorage.app",
    messagingSenderId: "232802386570",
    appId: "1:232802386570:web:884dd069324bb6e92f2373"
};

const ADMIN_EMAIL = "atifneyaz018@gmail.com";
const CATALOGUE_URL = "https://drive.google.com/file/d/YOUR_FILE_ID/view";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const adminPanel = document.getElementById('adminPanel');
const adminClose = document.getElementById('adminClose');
const adminSignOut = document.getElementById('adminSignOut');
const catalogueBtn = document.getElementById('catalogueBtn');
const mobileCatalogueBtn = document.getElementById('mobileCatalogueBtn');

// Check auth state on load
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateCatalogueBtn(user);
    }
});

function updateCatalogueBtn(user) {
    if (user.email === ADMIN_EMAIL) {
        catalogueBtn.textContent = 'Admin Panel';
        if (mobileCatalogueBtn) mobileCatalogueBtn.textContent = 'Admin Panel';
    } else {
        catalogueBtn.textContent = 'View Catalogue';
        if (mobileCatalogueBtn) mobileCatalogueBtn.textContent = 'View Catalogue';
    }
}

function handleCatalogueClick() {
    const user = auth.currentUser;
    if (!user) {
        modalOverlay.classList.add('active');
    } else if (user.email === ADMIN_EMAIL) {
        adminPanel.classList.add('active');
    } else {
        window.open(CATALOGUE_URL, '_blank');
    }
}

catalogueBtn.addEventListener('click', handleCatalogueClick);
if (mobileCatalogueBtn) mobileCatalogueBtn.addEventListener('click', handleCatalogueClick);

modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});

googleSignInBtn.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        modalOverlay.classList.remove('active');

        if (user.email === ADMIN_EMAIL) {
            adminPanel.classList.add('active');
        } else {
            // Send WhatsApp notification to Mohammad
            const message = `New Catalogue Request!\nName: ${user.displayName}\nEmail: ${user.email}\nTime: ${new Date().toLocaleString('en-IN')}`;
            window.open(`https://wa.me/917654641785?text=${encodeURIComponent(message)}`, '_blank');
            // Open catalogue
            setTimeout(() => {
                window.open(CATALOGUE_URL, '_blank');
            }, 1000);
        }
        updateCatalogueBtn(user);
    } catch (error) {
        console.error('Sign in error:', error);
    }
});

adminClose.addEventListener('click', () => {
    adminPanel.classList.remove('active');
});

adminSignOut.addEventListener('click', async () => {
    await signOut(auth);
    adminPanel.classList.remove('active');
    catalogueBtn.textContent = 'Get Catalogue';
    if (mobileCatalogueBtn) mobileCatalogueBtn.textContent = 'Get Catalogue';
});