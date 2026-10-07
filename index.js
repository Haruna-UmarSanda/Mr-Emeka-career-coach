const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
document.querySelector('.menu-button').onclick = () => {
  sidebar.classList.add('open'); 
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('closeBtn').onclick = 
overlay.onclick = () => {
  sidebar.classList.remove('open'); 
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.sidebar-links li a').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  })
})

// const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbypKGMTmBXCfAaeuSpDr87SELPY3u-t-SNAQeabuZjVtJQQnVIPvDU0dIenKPNyAfIC/exec';

// document.getElementById('leadForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = document.getElementById('emailInput').value.trim();
//   const msg = document.querySelector('.message');
  
//   msg.textContent = 'Sending...';
//   msg.disabled = true;

//   try {
//     await fetch(GOOGLE_SHEET_URL, {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ email: email, source: 'MrEmeka Checklist' })
//     });

//     // Success
//     msg.textContent = '✓ Check your downloads!';
    
//     // Trigger PDF download - change file name to your actual PDF
//     const a = document.createElement('a');
//     a.href = '/nysc-job-success-guide.pdf'; 
//     a.download = 'Mr-Emeka-Job-Success-guide.pdf';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);

//     setTimeout(() => {
//       document.getElementById('leadForm').reset();
//       btn.innerHTML = '<span>↓</span> Get Your Free Job Success Guide <span>→</span>';
//       btn.disabled = false;
//     }, 3000);

//   } catch(err) {
//     msg.textContent = 'Error - Try Again';
//     msg.disabled = false;
//   }
// });

const heroBtn = document.getElementById('hero-button');
const downloadForm = document.querySelector('.free-container');
heroBtn.addEventListener('click', () => {
  downloadForm.scrollIntoView({behavior : "smooth", block : "start"});

})


const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbypkGMTmBXCfAaeuSpDr87SELPY3u-t-SNAQeabuZjVtJQQnVlPvDU0dIenKPNyAfIC/exec';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(el, text, isSuccess) {
  el.textContent = text;
  el.style.display ='block';
  if (isSuccess) {
    el.style.backgroundColor = '#dcfce7';
    el.style.color = '#166534';
    el.style.border = '1px solid #86efac';
  } else {
    el.style.backgroundColor = '#fee2e2';
    el.style.color = '#991b1b';
    el.style.border = '1px solid #fca5a5';
  }
}

function downloadPDF() {
  const a = document.createElement('a');
  a.href = '/nysc-job-success-guide.pdf'; // <-- your PDF path
  a.download = 'Mr-Emeka-Job-Success-Guide.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function handleForm({ nameInput, emailInput, btn, msg, requireName }) {
  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput.value.trim();

  // --- 1. VALIDATE NAME (only for form that requires it) ---
  if (requireName) {
    if (name.length < 2) {
      showMessage(msg, '✗ Please enter your full name', false);
      return false; // stop here, no download
    }
  }

  // --- 2. VALIDATE EMAIL ---
  if (!email) {
    showMessage(msg, '✗ Email is required', false);
    return false;
  }
  if (!validateEmail(email)) {
    showMessage(msg, '✗ Invalid email. Example: emeka@gmail.com', false);
    return false; // stop here, no download
  }

  // --- 3. IF WE REACH HERE, VALIDATION PASSED ---
  msg.textContent = 'Sending...';
  btn.disabled = true;

  try {
    // Save to Google Sheet
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name || 'No name', 
        email: email, 
        source: requireName ? 'Free job success guide' : 'free checklist download' 
      })
    });

    // Show GREEN success message
    showMessage(msg, '✓ Valid! Your guide is downloading...', true);
    
    // DOWNLOAD PDF - ONLY AFTER VALIDATION
    downloadPDF();

    btn.textContent = '✓ Downloaded!';
    
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = requireName ? '<span>↓</span> Get Your Free Job Success Guide <span>→</span>' : 'Get Checklist';
      if(nameInput) nameInput.value = '';
      emailInput.value = '';
    }, 3000);

  } catch (err) {
    // Even if sheet fails, still give PDF because validation passed
    showMessage(msg, '✓ Valid! Downloading guide...', true);
    downloadPDF();
    btn.textContent = '✓ Downloaded!';
    btn.disabled = false;
  }
}

// --- FORM 1: Requires Name + Email ---
document.getElementById('leadForm1').addEventListener('submit', function(e) {
  e.preventDefault();
  handleForm({
    nameInput: document.getElementById('Name'),
    emailInput: document.getElementById('emailInput1'),
    btn: document.getElementById('submitBtn1'),
    msg: document.getElementById('message1'),
    requireName: true
  });
});