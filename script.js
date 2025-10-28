const QUESTIONS = [
let state = {index:0, score:0};
const qIndexEl = document.getElementById('qIndex');
const totalQ = document.getElementById('totalQ');
const scoreEl = document.getElementById('score');
const questionText = document.getElementById('questionText');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const vennArea = document.getElementById('vennArea');
const results = document.getElementById('results');
const finalScore = document.getElementById('finalScore');
const playAgain = document.getElementById('playAgain');


totalQ.textContent = QUESTIONS.length;


function renderVenn(venn){
// Simple SVG Venn diagram with labels
const A = venn.A; const B = venn.B;
const union = Array.from(new Set([...A, ...B]));
// Build simple SVG with two circles and text listing union or specific regions
const svg = `
<svg width="320" height="180" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
<defs>
<style> .t{font-family:sans-serif; font-size:12px; fill:#3e2a1f}</style>
</defs>
<circle cx="120" cy="90" r="60" fill="#a9745b" fill-opacity="0.35" stroke="#6b4226" />
<circle cx="200" cy="90" r="60" fill="#d9b48f" fill-opacity="0.35" stroke="#6b4226" />
<text x="90" y="40" class="t">A</text>
<text x="230" y="40" class="t">B</text>
<text x="70" y="120" class="t">A: {${A.join(',')}} </text>
<text x="160" y="120" class="t">B: {${B.join(',')}} </text>
</svg>`;
vennArea.innerHTML = svg;
}


function showQuestion(){
const q = QUESTIONS[state.index];
qIndexEl.textContent = state.index + 1;
questionText.textContent = q.text;
choicesEl.innerHTML = '';
nextBtn.disabled = true;
if(q.type === 'venn') renderVenn(q.venn); else vennArea.innerHTML = '';


q.choices.forEach((c,i)=>{
const btn = document.createElement('button');
btn.className = 'choiceBtn';
btn.textContent = c;
btn.addEventListener('click', ()=> selectChoice(i, btn));
choicesEl.appendChild(btn);
});
}


function selectChoice(i, btn){
const q = QUESTIONS[state.index];
// disable all
Array.from(choicesEl.children).forEach(b=>b.disabled=true);
if(i === q.answer){
btn.classList.add('correct');
state.score += 10;
scoreEl.textContent = state.score;
} else {
btn.classList.add('wrong');
// mark correct
const correctBtn = choicesEl.children[q.answer];
if(correctBtn) correctBtn.classList.add('correct');
}
nextBtn.disabled = false;
}


nextBtn.addEventListener('click', ()=>{
state.index++;
if(state.index >= QUESTIONS.length){
// selesai
showResults();
} else showQuestion();
});


restartBtn.addEventListener('click', ()=> resetGame());
playAgain.addEventListener('click', ()=> resetGame());


function showResults(){
document.getElementById('game').classList.add('hidden');
results.classList.remove('hidden');
finalScore.textContent = state.score;
}


function resetGame(){
state = {index:0, score:0};
scoreEl.textContent = state.score;
document.getElementById('game').classList.remove('hidden');
results.classList.add('hidden');
showQuestion();
}


// init
showQuestion();
