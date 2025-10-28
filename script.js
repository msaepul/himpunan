// Simple set implementation using JS Set
bOnly.forEach((v, i) => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', bx + (i % 6) * 18);
    t.setAttribute('y', by + Math.floor(i / 6) * 18 - 20);
    t.setAttribute('class', 'svgelem');
    t.textContent = v;
    t.style.cursor = 'pointer';
    t.onclick = () => { B.delete(v); renderSets(); renderSvg(); }
    if (highlightSet && highlightSet.has(v)) t.style.fontWeight = '700';
    elemsSvg.appendChild(t);
});


let ix = 275, iy = 150;
both.forEach((v, i) => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', ix + (i % 6) * 18);
    t.setAttribute('y', iy + Math.floor(i / 6) * 18 - 8);
    t.setAttribute('class', 'svgelem');
    t.textContent = v;
    t.style.cursor = 'pointer';
    t.onclick = () => { A.delete(v); B.delete(v); renderSets(); renderSvg(); }
    if (highlightSet && highlightSet.has(v)) t.style.fontWeight = '700';
    elemsSvg.appendChild(t);
});
}


// initial render
renderSets(); renderSvg();