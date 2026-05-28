const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// 1. Check for saved user preference on page load
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.checked = true; // Make sure the toggle looks "on"
}

// 2. Use 'change' event for checkboxes
toggleBtn.addEventListener('change', () => {
    if (toggleBtn.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// --- 2. AI Summary Modal Logic ---

const modal = document.getElementById('ai-modal');
const modalText = document.getElementById('modal-text');
const aiBtn = document.getElementById('ai-summarize-btn');
const closeBtn = document.querySelector('.close-modal');

// Check which page we are on to provide the right summary
const isExperiencePage = window.location.pathname.includes("experience.html");

const projectSummary = "David is a Computer Engineering student at USC with a strong background in Java and Embedded Systems. He has successfully led teams in web development and designed automated hardware solutions using 8086 microprocessors.";

const experienceSummary = "David has a progressive professional background, starting as a Web Developer Intern at Kyocera, moving into IT Support at Globe Telecom, and currently serving as a Software Developer at Accenture, where he specializes in backend modules and API integration.";

// Select the appropriate summary based on the current page
const activeSummary = isExperiencePage ? experienceSummary : projectSummary;

if (aiBtn && modal) {
    aiBtn.addEventListener('click', () => {
        modal.style.display = "block";
        modalText.innerHTML = ""; 
        
        let i = 0;
        function typeWriter() {
            if (i < activeSummary.length) {
                modalText.innerHTML += activeSummary.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        }
        typeWriter();
    });
}

// Close Modal when clicking (x)
closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Close Modal when clicking outside the box
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// --- Scroll to Top Logic ---
const scrollBtn = document.getElementById("scrollToTopBtn");

// Show button when user scrolls down 300px from the top
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// When the user clicks, scroll to the top smoothly
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --- Copy to Clipboard Function ---
function copyToClipboard(text, feedbackId) {
    navigator.clipboard.writeText(text).then(() => {
        const feedback = document.getElementById(feedbackId);
        
        // 1. Set the text and make it visible
        feedback.innerText = "Copied!"; 
        feedback.style.display = "inline"; // Ensure it takes up space
        feedback.style.opacity = "1";
        
        // 2. Hide it after 2 seconds
        setTimeout(() => {
            feedback.style.opacity = "0";
            
            // 3. Optional: Fully remove text after the fade animation finishes (300ms)
            setTimeout(() => {
                if (feedback.style.opacity === "0") {
                    feedback.innerText = "";
                }
            }, 300); 
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}