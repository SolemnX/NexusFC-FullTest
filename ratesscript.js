const baseValues = {
    common: { base: 1, shiny: 8192 },
    uncommon: { base: 8, shiny: 65536 },
    rare: { base: 60, shiny: 491520 },
    veryRare: { base: 600, shiny: 4915200 },
    extremelyRare: { base: 5000, shiny: 40960000 },
    legendary: { base: 125000, shiny: 1024000000 },
    eventLegendary: { base: 100000, shiny: 819200000 }
};

const inputs = {
    rareCharmCheckbox: document.getElementById('rare-charm-checkbox'),
    hunterCharmCheckbox: document.getElementById('hunter-charm-checkbox'),
    gmCheckbox: document.getElementById('gm-checkbox'),
    swarmCheckbox: document.getElementById('swarm-checkbox'),
    honeyCheckbox: document.getElementById('honey-checkbox'),
    alteringCheckbox: document.getElementById('altering-checkbox'),
    enhancedCheckbox: document.getElementById('enhanced-checkbox'),
    legend2Checkbox: document.getElementById('legend2-checkbox'),
    shinyCharmCheckbox: document.getElementById('shiny-charm-checkbox'),
    shiny2Checkbox: document.getElementById('shiny2-checkbox'),
    shinylureCheckbox: document.getElementById('shiny-lure-checkbox')
};

function applyModifiers() {
    const rareCharm = inputs.rareCharmCheckbox?.checked ?? false;
    const hunterCharm = inputs.hunterCharmCheckbox?.checked ?? false;
    const gm = inputs.gmCheckbox?.checked ?? false;
    const swarm = inputs.swarmCheckbox?.checked ?? false;
    const honey = inputs.honeyCheckbox?.checked ?? false;
    const altering = inputs.alteringCheckbox?.checked ?? false;
    const shinyCharm = inputs.shinyCharmCheckbox?.checked ?? false;
    const enhanced = inputs.enhancedCheckbox?.checked ?? false;
    const legend2 = inputs.legend2Checkbox?.checked ?? false;
    const shinylure = inputs.shinylureCheckbox?.checked ?? false;
    const shiny2 = inputs.shiny2Checkbox?.checked ?? false;

    for (const [key, value] of Object.entries(baseValues)) {
        const base = document.getElementById(`${key}-base`);
        const shiny = document.getElementById(`${key}-shiny`);
        
        if (!base || !shiny) {
            console.error(`Element with ID ${key}-base or ${key}-shiny not found.`);
            continue;
        }
        
        let baseValue = value.base;
        let shinyValue = value.shiny;

        // Apply Shiny Charm modifications
        if (shinyCharm) {
            shinyValue = Math.round(shinyValue / 1.25);
        }
        if (shiny2) {
            shinyValue = Math.round(shinyValue / 2);
        }
        if (shinylure) {
            shinyValue = Math.round(shinyValue / 1.25);
        }
        // Apply Honey modifications
        if (honey) {
            if (baseValue !== 1) baseValue = Math.round(baseValue / 1.25);
            if (shinyValue !== 8192) shinyValue = Math.round(shinyValue / 1.25);
        }
        //Apply Altering modifications
        if (altering) {
            if (baseValue !== 1 && key !== 'eventLegendary') baseValue = Math.round(baseValue / 1.3);
            if (shinyValue !== 8192 && key !== 'eventLegendary') shinyValue = Math.round(shinyValue / 1.3);
        }
        if (enhanced) {
            if (key == 'legendary') baseValue = Math.round(baseValue / 1.2);
            if (key == 'legendary') shinyValue = Math.round(shinyValue / 1.2);
        }
        if (legend2) {
            if (key == 'legendary' || key == 'eventLegendary' ) baseValue = Math.round(baseValue / 2);
            if (key == 'legendary' || key == 'eventLegendary' ) shinyValue = Math.round(shinyValue / 2);
        }
        // Apply GM modifications
        if (gm) {
            if (baseValue !== 1) baseValue = Math.round(baseValue / 1.5);
            if (shinyValue !== 8192) shinyValue = Math.round(shinyValue / 1.8);
            else shinyValue = Math.round(shinyValue / 1.2); // Special case for 8192
        }

        if (swarm) {
            // Adjust baseValue for non-legendary, non-eventLegendary keys
            if (baseValue !== 1 && key !== 'legendary' && key !== 'eventLegendary') {
                baseValue = Math.round(baseValue / 1.25);
            }
            
            // Adjust shinyValue for non-legendary, non-eventLegendary keys
            if (shinyValue !== 8192 && key !== 'legendary' && key !== 'eventLegendary') {
                shinyValue = Math.round(shinyValue / 1.375);
            }
        
            // Special handling for legendary keys
            if (key === 'legendary') {
                baseValue = Math.round(baseValue / 1.1);
                shinyValue = Math.round(shinyValue / 1.21);
            } 
        
            // Special handling for eventLegendary keys
            if (key === 'eventLegendary') {  }
            
            if (shinyValue === 8192 && key !== 'legendary' && key !== 'eventLegendary') {
                shinyValue = Math.round(shinyValue / 1.1);
            }
        }

        // Apply Rare Charm and Hunter Charm modifications
        if (key !== 'common') {
            if (rareCharm) baseValue = Math.round(baseValue / 1.1);
            if (hunterCharm) baseValue = Math.round(baseValue / 1.2);
            if (rareCharm && hunterCharm) shinyValue = Math.round(shinyValue / 1.1 / 1.2);
            else if (rareCharm) shinyValue = Math.round(shinyValue / 1.1);
            else if (hunterCharm) shinyValue = Math.round(shinyValue / 1.2);
        }
        
        base.value = baseValue;
        shiny.value = shinyValue;
    }
}

function handleExclusiveCheckboxes(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
        document.querySelectorAll('.box:first-child input[type=checkbox]').forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
    }
    applyModifiers();
}

document.querySelectorAll('.box:first-child input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', handleExclusiveCheckboxes);
});

document.querySelectorAll('.box:last-child input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', applyModifiers);
});

applyModifiers(); // Initial call to set base values

//Daycare calculator build below

const Levels = { 1:139,2:159,3:179,4:200,5:222,6:248,7:278,8:316,9:363,10:422,11:496,12:590,13:707,14:852,15:1029,16:1244,17:1502,18:1808,19:2170,20:2594,21:3086,22:3655,23:4308,24:5053,25:5899,26:6854,27:7928,28:9131,29:10473,30:11963,31:13613,32:15435,33:17439,34:19637,35:22043,36:24667,37:27525,38:30628,39:33991,40:37628,41:41554,42:45873,43:50331,44:55213,45:60446,46:66046,47:72030,48:78415,49:85219,50:92459,51:100154,52:108323,53:116985,54:126158,55:135864,56:146123,57:156954,58:168379,59:180419,60:193097,61:206433,62:220451,63:235173,64:250624,65:266825,66:283802,67:301578,68:320179,69:339629,70:359955,71:391181,72:403334,73:426442,74:450530,75:475626,76:501759,77:528955,78:557244,79:586655,80:617217,81:648959,82:681911,83:716105,84:751570,85:788338,86:826441,87:865910,88:906777,89:949076,90:992839,91:1038100,92:1084892,93:1133250,94:1183209,95:1234802,96:1288066,97:1343037,98:1399750,99:1458241,100:0,};
  
  const sumButton = document.getElementById('sum-button');
  const multiplyButton = document.getElementById('multiply-button');
  const resultDiv1 = document.getElementById('result1');
  const resultDiv2 = document.getElementById('result2');
  
  let sum = 0;
  
  sumButton.addEventListener('click', () => {
    const startLevel = parseInt(document.getElementById('start-level').value);
    const endLevel = parseInt(document.getElementById('end-level').value);
  
    if (isNaN(startLevel) || isNaN(endLevel) || startLevel < 1 || endLevel > 100 || startLevel >= endLevel) {
      resultDiv1.innerHTML = 'Invalid input. Please enter valid levels between 1 and 100, with the start level less than the end level.';
      return;
    }
  
    sum = 0;
    for (let i = startLevel; i < endLevel; i++) {
      sum += Levels[i];
    }
  
    resultDiv1.innerHTML = `The amount of EXP needed from level ${startLevel} to level ${endLevel} is ${sum}.`;
    multiplyButton.disabled = false;
    sumButton.disabled = false;
  });
  
  multiplyButton.addEventListener('click', () => {
    const factor = Number(document.getElementById('factor').value);
    if (isNaN(factor) || factor <= 0) {
      resultDiv2.innerHTML = 'Invalid factor value. Please enter a positive number.';
      return;
    }
    const product = (sum * factor) / 100000;
    resultDiv2.innerHTML = `Total Cost of Daycare is $${product.toFixed(2)}.`;
  });
  
const flevels ={1:41,	2:48,	3:67,	4:104,	5:165,	6:256,	7:383,	8:552,	9:769,	10:1040,	11:1371,	12:1768,	13:2237,	14:2784,	15:3415,	16:4136,	17:5872,	18:6899,	19:8040,	20:9301,	21:9301,	22:10688,	23:12207,	24:13864,	25:15665,	26:17616,	27:19723,	28:21992,	29:24429,	30:27040,	31:29831,	32:32808,	33:35977,	34:39344,	35:42915,	36:46696,	37:50693,	38:54912,	39:59359,	40:64040,	41:68961,	42:74128,	43:79547,	44:85224,	45:91165,	46:97376,	47:103863,	48:110632,	49:117689,	50:125040,	51:132691,	52:140648,	53:148917,	54:157504,	55:166415,	56:175656,	57:185233,	58:195152,	59:205419,	60:216040,	61:227021,	62:238368,	63:250087,	64:262184,	65:274665,	66:287536,	67:300803,	68:314472,	69:328549,	70:343040,	71:357951,	72:373288,	73:389057,	74:405264,	75:421915,	76:439016,	77:456573,	78:474592,	79:493079,	80:512040,	81:531481,	82:551408,	83:571827,	84:592744,	85:614165,	86:636096,	87:658543,	88:681512,	89:705009,	90:729040,	91:753611,	92:778728,	93:804397,	94:830624,	95:857415,	96:884776,	97:912713,	98:941232,	99:970339,	100:0}
const fsumButton = document.getElementById('fsum-button');
const fmultiplyButton = document.getElementById('fmultiply-button');
const fresultDiv1 = document.getElementById('fresult1');
let fsum = 0;
fsumButton.addEventListener('click', () => {
  const fstartLevel = parseInt(document.getElementById('fstart-level').value);
  const fendLevel = parseInt(document.getElementById('fend-level').value);

  if (isNaN(fstartLevel) || isNaN(fendLevel) || fstartLevel < 1 || fendLevel > 100 || fstartLevel >= fendLevel) {
    fresultDiv1.innerHTML = 'Invalid input. Please enter valid levels between 1 and 100, with the start level less than the end level.';
    return;
  }

  fsum = 0;
  for (let i = fstartLevel; i < fendLevel; i++) {
    fsum += flevels[i];
  }

  fresultDiv1.innerHTML = `The amount of EXP needed from level ${fstartLevel} to level ${fendLevel} is ${fsum}.`;
  fmultiplyButton.disabled = false;
  fsumButton.disabled = false;
});


document.addEventListener('DOMContentLoaded', () => {
    // Function to handle changes in the dropdowns and inputs
    const handleOddEvenChange = (inputId, selectId) => {
        const inputElement = document.getElementById(inputId);
        const selectElement = document.getElementById(selectId);

        // Update dropdown based on input value
        const updateDropdown = () => {
            const value = parseInt(inputElement.value, 10);
            if (value % 2 === 0) {
                selectElement.value = 'e';
            } else {
                selectElement.value = 'o';
            }
        };

        // Listen to changes in the input field
        inputElement.addEventListener('input', updateDropdown);

        // Listen to changes in the dropdown and update the input field accordingly
        selectElement.addEventListener('change', () => {
            if (selectElement.value === 'e') {
                inputElement.value = 30;
            } else if (selectElement.value === 'o') {
                inputElement.value = 31;
            }
        });

        // Initialize the dropdown based on the default input value
        updateDropdown();
    };

    // Apply the function to each stat row
    handleOddEvenChange('hp', 'hp-odd-even');
    handleOddEvenChange('atk', 'atk-odd-even');
    handleOddEvenChange('def', 'def-odd-even');
    handleOddEvenChange('sp-atk', 'sp-atk-odd-even');
    handleOddEvenChange('sp-def', 'sp-def-odd-even');
    handleOddEvenChange('speed', 'speed-odd-even');

    // Function to handle the calculation and result display
    const calculate = () => {
        // Get values from inputs
        const ivs = [
            document.getElementById('hp-odd-even').value,
            document.getElementById('atk-odd-even').value,
            document.getElementById('def-odd-even').value,
            document.getElementById('sp-atk-odd-even').value,
            document.getElementById('sp-def-odd-even').value,
            document.getElementById('speed-odd-even').value
        ].join('');

        // Results elements
        const elementResult = document.getElementById('element');
        const fireResult = document.getElementById('fire');
        const iceResult = document.getElementById('ice');
        const groundResult = document.getElementById('ground');

        // Example data - replace with actual data source if needed
        const data = [
            {"HP":"eeeoeo","Element":"Hidden Power Bug","Fire":"Def & SpAtk & SpDef & Spe\n- OR -\nAtk & SpAtk & SpDef & Spe","Ice":"SpDef","Ground":"Spe","Icon":"https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png"},
            {"HP":"ooooee","Element":"Hidden Power Bug","Fire":"Atk & SpAtk & SpeDef\n- OR -\nDef & SpAtk & SpDef","Ice":"SpDef","Ground":"SpAtk & Spe","Icon":"https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png"},
            {"HP":"eoooee","Element":"Hidden Power Bug","Fire":"Atk & SpAtk & SpDef\n- OR -\nDef & SpAtk & SpDef","Ice":"Def & SpDef & Spe","Ground":"Atk & Def\n- OR -\nSpAtk & Spe","Icon":"https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png"},
            {"HP":"oeooee","Element":"Hidden Power Bug","Fire":"SpAtk & SpDef","Ice":"Atk & SpDef","Ground":"HP & Def\n- OR -\nSpAtk & Spe","Icon":"https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png"},
            {"HP":"oooooo","Element":"Hidden Power Dark","Fire":"Atk & SpAtk & Spe\n- OR -\nDef & SpAtk & Spe","Ice":"Spe","Ground":"SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/d/d5/Dark_icon_SwSh.png"},
            {"HP":"eooooo","Element":"Hidden Power Dragon","Fire":"Atk & SpAtk & Spe\n- OR -\nDef & SpAtk & Spe","Ice":"Def","Ground":"SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png"},
            {"HP":"oeoooo","Element":"Hidden Power Dragon","Fire":"SpAtk & Spe","Ice":"Def","Ground":"SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png"},
            {"HP":"eeoooo","Element":"Hidden Power Dragon","Fire":"SpAtk & Spe","Ice":"Def","Ground":"Def & SpDef & Spe\n- OR -\nAtk & SpAtk & SpDef\n- OR -\nHP & SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png"},
            {"HP":"ooeooo","Element":"Hidden Power Dragon","Fire":"SpAtk & Spe","Ice":"HP\n- OR -\nAtk","Ground":"Def & SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png"},
            {"HP":"eoeooe","Element":"Hidden Power Electric","Fire":"SpAtk","Ice":"Spe","Ground":"Atk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png"},
            {"HP":"oeeooe","Element":"Hidden Power Electric","Fire":"Def & SpAtk\n- OR -\nAtk & SpAtk","Ice":"Spe","Ground":"Hp & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png"},
            {"HP":"eeeooe","Element":"Hidden Power Electric","Fire":"Def & SpAtk\n- OR -\nAtk & SpAtk","Ice":"Spe","Ground":"SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png"},
            {"HP":"oooeoo","Element":"Hidden Power Electric","Fire":"Atk & Spe\n- OR -\nDef & Spe","Ice":"SpAtk & Spe","Ground":"SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png"},
            {"HP":"eeoeee","Element":"Hidden Power Fighting","Fire":"SpDef","Ice":"Def & SpAtk & SpDef & Spe\n- OR -\nHp & Atk & SpAtk & SpDef","Ground":"Def & SpAtk\n- OR -\nAtk & Spe\n- OR -\nHp & Spe","Icon":"https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png"},
            {"HP":"ooeeee","Element":"Hidden Power Fighting","Fire":"SpDef","Ice":"Def & SpAtk & SpDef","Ground":"Def & Spe","Icon":"https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png"},
            {"HP":"eoeeee","Element":"Hidden Power Fighting","Fire":"SpDef","Ice":"SpAtk & SpDef & Spe","Ground":"Atk & SpAtk","Icon":"https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png"},
            {"HP":"oeeeee","Element":"Hidden Power Fighting","Fire":"Def & SpDef\n- OR -\nAtk & SpDef","Ice":"SpAtk & SpDef & Spe","Ground":"Hp & SpAtk\n- OR -\nDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png"},
            {"HP":"eeeeee","Element":"Hidden Power Fighting","Fire":"Def & SpDef\n- OR -\nAtk & SpDef","Ice":"SpAtk & SpDef & Spe","Ground":"SpAtk","Icon":"https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png"},
            {"HP":"oeoeoe","Element":"Hidden Power Fire","Fire":"No Change","Ice":"Atk & SpAtk","Ground":"SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png"},
            {"HP":"eeoeoe","Element":"Hidden Power Fire","Fire":"No Change","Ice":"Def & SpAtk & Spe\n- OR -\nHp & Atk & SpAtk","Ground":"Def & SpAtk & SpDef\n- OR -\nAtk & SpDef & Spe\n- OR -\nHp & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png"},
            {"HP":"ooeeoe","Element":"Hidden Power Fire","Fire":"No Change","Ice":"Def & SpAtk","Ground":"Def & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png"},
            {"HP":"eoeeoe","Element":"Hidden Power Fire","Fire":"No Change","Ice":"SpAtk & Spe","Ground":"Atk & SpAtk & SpDef\n- OR -\nDef & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png"},
            {"HP":"eeeeeo","Element":"Hidden Power Flying","Fire":"Def & SpDef & Spe\n- OR -\nAtk & SpDef & Spe","Ice":"SpAtk & SpDef","Ground":"SpAtk & Spe\n- OR -\nAtk & Def\n- OR -\nHp & Def","Icon":"https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png"},
            {"HP":"oooeee","Element":"Hidden Power Flying","Fire":"Atk & SpDef\n- OR -\nDef & SpDef","Ice":"SpAtk & SpDef","Ground":"Spe","Icon":"https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png"},
            {"HP":"eooeee","Element":"Hidden Power Flying","Fire":"Atk & SpDef\n- OR -\nDef & SpDef","Ice":"Hp & SpAtk & SpDef","Ground":"Spe","Icon":"https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png"},
            {"HP":"oeoeee","Element":"Hidden Power Flying","Fire":"SpDef","Ice":"Atk & SpAtk & SpDef","Ground":"Spe","Icon":"https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png"},
            {"HP":"oeooeo","Element":"Hidden Power Ghost","Fire":"SpAtk & SpDef & Spe","Ice":"Def & SpDef","Ground":"SpAtk","Icon":"https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png"},
            {"HP":"eeooeo","Element":"Hidden Power Ghost","Fire":"SpAtk & SpDef & Spe","Ice":"Def & SpDef","Ground":"Atk & SpAtk\n- OR -\nHp & SpAtk","Icon":"https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png"},
            {"HP":"ooeoeo","Element":"Hidden Power Ghost","Fire":"SpAtk & SpDef & Spe","Ice":"Hp & SpDef\n- OR -\nAtk & SpDef","Ground":"Def & SpAtk","Icon":"https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png"},
            {"HP":"eoeoeo","Element":"Hidden Power Ghost","Fire":"SpAtk & SpDef & Spe","Ice":"SpDef","Ground":"Atk & Spe\n- OR -\nDef & SpAtk","Icon":"https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png"},
            {"HP":"eooeoo","Element":"Hidden Power Grass","Fire":"Atk & Spe\n- OR -\nDef & Spe","Ice":"Def & SpAtk","Ground":"SpDef","Icon":"https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png"},
            {"HP":"oeoeoo","Element":"Hidden Power Grass","Fire":"Spe","Ice":"Def & SpAtk","Ground":"SpDef","Icon":"https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png"},
            {"HP":"eeoeoo","Element":"Hidden Power Grass","Fire":"Spe","Ice":"Def & SpAtk","Ground":"Atk & SpDef\n- OR -\nHp & SpDef","Icon":"https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png"},
            {"HP":"ooeeoo","Element":"Hidden Power Grass","Fire":"Spe","Ice":"Hp & SpAtk\n- OR -\nAtk & SpAtk","Ground":"Def & SpDef","Icon":"https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png"},
            {"HP":"eoeeoo","Element":"Hidden Power Grass","Fire":"Spe","Ice":"SpAtk","Ground":"Def & SpDef","Icon":"https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png"},
            {"HP":"eeeoee","Element":"Hidden Power Ground","Fire":"Def & SpAtk & SpDef\n- OR -\nAtk & SpAtk & SpDef","Ice":"SpDef & Spe","Ground":"No Change","Icon":"https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png"},
            {"HP":"oooeeo","Element":"Hidden Power Ground","Fire":"Atk & SpDef & Spe\n- OR -\nDef & SpDef & Spe","Ice":"SpAtk & SpDef & Spe","Ground":"No Change","Icon":"https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png"},
            {"HP":"eooeeo","Element":"Hidden Power Ground","Fire":"Atk & SpDef & Spe\n- OR -\nDef & SpDef & Spe","Ice":"Def & SpAtk & SpDef","Ground":"No Change","Icon":"https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png"},
            {"HP":"oeoeeo","Element":"Hidden Power Ground","Fire":"SpDef & Spe","Ice":"Def & SpAtk & SpDef","Ground":"No Change","Icon":"https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png"},
            {"HP":"eoeooo","Element":"Hidden Power Ice","Fire":"SpAtk & Spe","Ice":"No Change","Ground":"Atk & SpDef & Spe\n- OR -\nDef & SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png"},
            {"HP":"oeeooo","Element":"Hidden Power Ice","Fire":"Def & SpAtk & Spe\n- OR -\nAtk & SpAtk & Spe","Ice":"No Change","Ground":"Hp & SpDef & Spe\n- OR -\nDef & SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png"},
            {"HP":"eeeooo","Element":"Hidden Power Ice","Fire":"Def & SpAtk & Spe\n- OR -\nAtk & SpAtk & Spe","Ice":"No Change","Ground":"SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png"},
            {"HP":"oooooe","Element":"Hidden Power Ice","Fire":"Atk & SpAtk\n- OR -\nDef & SpAtk","Ice":"No Change","Ground":"SpAtk & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png"},
            {"HP":"eeoeeo","Element":"Hidden Power Poison","Fire":"SpDef & Spe","Ice":"Def & SpAtk & SpDef","Ground":"Atk\n- OR -\nHp","Icon":"https://cdn.bulbagarden.net/upload/8/8d/Poison_icon_SwSh.png"},
            {"HP":"ooeeeo","Element":"Hidden Power Poison","Fire":"SpDef & Spe","Ice":"Hp & SpAtk & SpDef","Ground":"Def","Icon":"https://cdn.bulbagarden.net/upload/8/8d/Poison_icon_SwSh.png"},
            {"HP":"eoeeeo","Element":"Hidden Power Poison","Fire":"SpDef & Spe","Ice":"SpAtk & SpDef","Ground":"Def","Icon":"https://cdn.bulbagarden.net/upload/8/8d/Poison_icon_SwSh.png"},
            {"HP":"oeeeeo","Element":"Hidden Power Poison","Fire":"Def & SpDef & Spe\n- OR -\nAtk & SpDef & Spe","Ice":"SpAtk & SpDef","Ground":"Def","Icon":"https://cdn.bulbagarden.net/upload/8/8d/Poison_icon_SwSh.png"},
            {"HP":"eooooe","Element":"Hidden Power Psychic","Fire":"Atk & SpAtk\n- OR -\nDef & SpAtk","Ice":"Hp","Ground":"Atk & Def & SpDef\n- OR -\nSpAtk & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png"},
            {"HP":"oeoooe","Element":"Hidden Power Psychic","Fire":"SpAtk","Ice":"Atk","Ground":"Hp & Def & SpDef\n- OR -\nSpAtk & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png"},
            {"HP":"eeoooe","Element":"Hidden Power Psychic","Fire":"SpAtk","Ice":"Def & Spe\n- OR -\nHp & Atk","Ground":"Def & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png"},
            {"HP":"ooeooe","Element":"Hidden Power Psychic","Fire":"SpAtk","Ice":"Hp & Spe\n- OR -\nAtk & Spe","Ground":"Hp & Atk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png"},
            {"HP":"eeooee","Element":"Hidden Power Rock","Fire":"SpAtk & SpDef","Ice":"Def & SpDef & Spe\n- OR -\nHp & Atk & SpDef","Ground":"SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png"},
            {"HP":"ooeoee","Element":"Hidden Power Rock","Fire":"SpAtk & SpDef","Ice":"Def & SpDtk","Ground":"Hp & Atk","Icon":"https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png"},
            {"HP":"eoeoee","Element":"Hidden Power Rock","Fire":"SpAtk & SpDef","Ice":"SpDef & Spe","Ground":"Atk","Icon":"https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png"},
            {"HP":"oeeoee","Element":"Hidden Power Rock","Fire":"Def & SpAtk & SpDef\n- OR -\nAtk & SpAtk & SpDef","Ice":"SpDef & Spe","Ground":"Hp","Icon":"https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png"},
            {"HP":"oeeeoe","Element":"Hidden Power Steel","Fire":"Def\n- OR -\nAtk","Ice":"SpAtk & Spe","Ground":"Hp & SpAtk & SpDef\n- OR -\nDef & SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png"},
            {"HP":"eeeeoe","Element":"Hidden Power Steel","Fire":"Def\n- OR -\nAtk","Ice":"SpAtk & Spe","Ground":"SpAtk & SpDef","Icon":"https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png"},
            {"HP":"ooooeo","Element":"Hidden Power Steel","Fire":"Def & SpAtk & SpDef & Spe\n- OR -\nAtk & SpAtk & SpDef & Spe","Ice":"SpDef & Spe","Ground":"SpAtk","Icon":"https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png"},
            {"HP":"eoooeo","Element":"Hidden Power Steel","Fire":"Atk & SpAtk & SpDef & Spe\n- OR -\nDef & SpAtk & SpDef & Spe","Ice":"Def & SpDef","Ground":"SpAtk","Icon":"https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png"},
            {"HP":"oeeeoo","Element":"Hidden Power Water","Fire":"Def & Spe","Ice":"SpAtk","Ground":"Def & SpDef","Icon":"https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png"},
            {"HP":"eeeeoo","Element":"Hidden Power Water","Fire":"Def & Spe\n- OR -\nAtk & Spe","Ice":"SpAtk","Ground":"SpAtk & SpDef & Spe\n- OR -\nAtk & Def & SpDef\n- OR -\nHp & Def & SpDef","Icon":"https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png"},
            {"HP":"oooeoe","Element":"Hidden Power Water","Fire":"Atk\n- OR -\nDef","Ice":"SpAtk","Ground":"Spdef & Spe","Icon":"https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png"},
            {"HP":"eooeoe","Element":"Hidden Power Water","Fire":"Atk\n- OR -\nDef","Ice":"Hp & SpAtk","Ground":"SpDef & Spe","Icon":"https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png"}
        ];

        // Logic for calculating results based on IVs
        const result = data.find(item => item.HP === ivs);

        // Update results area based on the found result
        if (result) {
            elementResult.textContent = result.Element || 'No data';
            fireResult.textContent = result.Fire || 'No data';
            iceResult.textContent = result.Ice || 'No data';
            groundResult.textContent = result.Ground || 'No data';
            document.getElementById('result-area').style.display = 'block'; // Ensure result area is displayed
        } else {
            elementResult.textContent = 'No data';
            fireResult.textContent = 'No data';
            iceResult.textContent = 'No data';
            groundResult.textContent = 'No data';
            document.getElementById('result-area').style.display = 'block'; // Ensure result area is displayed
        }
    };

    // Set up the event listener for the Calculate button
    document.getElementById('calculate').addEventListener('click', calculate);
});


///New Code Here

//Do not modify below this

document.addEventListener('DOMContentLoaded', () => {
    const ratesButton = document.getElementById('rates-button');
    const spawnButton = document.getElementById('spawn-button');
    const pokeButton = document.getElementById('poke-button');
    const mineButton = document.getElementById('mine-button');
    const backButton = document.getElementById('back-button');
    const locButton = document.getElementById('loc-button');
    const evlocButton = document.getElementById('evloc-button');
  
    if (ratesButton) {
        ratesButton.addEventListener('click', () => {
            window.location.href = 'rates.html';
        });
    }
  
    if (spawnButton) {
      spawnButton.addEventListener('click', () => {
          window.location.href = 'spawn.html';
      });
  }
  
  if (pokeButton) {
    pokeButton.addEventListener('click', () => {
        window.location.href = 'pokedata.html';
    });
  }
  if (mineButton) {
      mineButton.addEventListener('click', () => {
          window.location.href = 'miningindex.html';
      });
    }
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    if (locButton) {
      locButton.addEventListener('click', () => {
          window.location.href = 'location.html';
      });
  }
  if (evlocButton) {
    evlocButton.addEventListener('click', () => {
        window.location.href = 'evlocation.html';
    });
}
  });