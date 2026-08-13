// Portfolio content and visual data. Edit this file to add or update entries.
window.PORTFOLIO_DATA = (() => {
function ctr(s,w){ const l=Math.max(0,Math.floor((w-s.length)/2)); return ' '.repeat(l)+s+' '.repeat(Math.max(0,w-s.length-l)); }
function cellW(n,W){ const b=Math.floor((W-(n-1))/n); const a=Array(n).fill(b); a[n-1]+=W-(n-1)-b*n; return a; }
function boxedD(spec){
  let W = 46;
  spec.forEach(s=>{ if(s.t==='row'){ const need=s.v.reduce((m,l)=>m+l.length+6,0)+(s.v.length-1); if(need>W) W=need; } });
  const total = W+2, mid = Math.floor(total/2);
  const out=[];
  spec.forEach(s=>{
    if(s.t==='row'){
      const w=cellW(s.v.length,W);
      out.push('┌'+w.map(x=>'─'.repeat(x)).join('┬')+'┐');
      out.push('│'+s.v.map((l,i)=>ctr(l,w[i])).join('│')+'│');
      out.push('└'+w.map(x=>'─'.repeat(x)).join('┴')+'┘');
    } else if(s.t==='arrow'){
      out.push(' '.repeat(mid)+'│'+(s.v?'   '+s.v:''));
      out.push(' '.repeat(mid)+'▼');
    } else if(s.t==='note'){
      out.push(ctr(s.v,total));
    } else {
      out.push(ctr(s.v,total));
    }
  });
  return out.join('\n');
}

function legacyD(spec){
  return spec.map(s=>{
    if(s.t==='row') return s.v.join('  +  ');
    if(s.t==='arrow') return s.v ? '-> '+s.v : '↓';
    if(s.t==='note') return '• '+s.v;
    return s.v;
  }).join('\n');
}

function D(spec){ return {diagram:spec}; }

const ENTRIES = [
  { slug:'reliaquest', section:'Experience', label:'ReliaQuest', abbr:'SWE', title:'ReliaQuest',
    role:'Software Engineering Intern · Tampa, FL', meta:['Jun 2026 – Present','C / C++','Multithreading','AWS'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Built interprocess communication for a legacy C/C++ endpoint agent, implementing subprocess state management and secure interaction with internal data stores (osquery, RocksDB) across 5+ coordinated subprocesses, cutting state-desync failures on agent restart by ~30%.',
        'Engineered a dynamic config loader on a monitor thread for the endpoint agent\u2019s log forwarder, auto-tuning threading, output compression, buffer intervals, and recovery modes from live health/system metrics to cut destination ingress bytes and cost up to ~1.73x while raising throughput EPS ceilings and shrinking device footprint.',
        'Proposed and designed an AWS load-balancing layer between client log sources (syslog/TCP) and the agent\u2019s log forwarders, routing input across agents by live per-agent metrics (EPS throughput, disk-buffer depth, CPU) to prevent buffer bloat and dropped logs during host network disruptions.'
      ]},
      {kind:'h',text:'SUBPROCESS COORDINATION'},
      {kind:'pre',text:D([
        {t:'row',v:['supervisor']},
        {t:'arrow'},
        {t:'row',v:['proc','proc','proc','proc','proc']},
        {t:'arrow',v:'restart-safe shared state'},
        {t:'row',v:['local stores']}
      ])},
      {kind:'para',text:'Generalized. Internal component names and topology are omitted.'},
      {kind:'h',text:'LOAD BALANCING (PROPOSED)'},
      {kind:'pre',text:D([
        {t:'text',v:'log sources - syslog / TCP'},
        {t:'arrow'},
        {t:'row',v:['load-balancing layer']},
        {t:'note',v:'routes on throughput · buffer depth · CPU'},
        {t:'arrow'},
        {t:'row',v:['forwarder','forwarder','forwarder']},
        {t:'arrow'},
        {t:'row',v:['destination']}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['C','C++','Multithreading','AWS','syslog/TCP','Networking','Linux','Git']},
      {kind:'see',items:['machine-intelligence-lab','summit-analytics']}
    ]},

  { slug:'machine-intelligence-lab', section:'Experience', label:'Machine Intelligence Lab', abbr:'MIL', title:'Machine Intelligence Lab',
    role:'Undergraduate Software Engineering Researcher · Gainesville, FL', meta:['Jan 2025 – Present','ROS2','Gazebo','C++'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Refactored and migrated 10,000+ lines of legacy C++ ROS1 code to ROS2, consolidating mission logic into modular Mission classes and reducing per-mission boilerplate by ~35%.',
        'Developed underwater Gazebo simulations modeling turbidity, buoyancy, and lighting, enabling reproducible testing that cut on-vehicle debugging cycles by ~50%.',
        'Integrated computer vision frameworks (Detectron2, YOLO) to enhance real-time perception and autonomy, improving object detection accuracy by 25% in simulation.'
      ]},
      {kind:'h',text:'SIMULATION LOOP'},
      {kind:'pre',text:D([
        {t:'row',v:['Gazebo world - turbidity · buoyancy · lighting']},
        {t:'arrow',v:'sensor streams'},
        {t:'row',v:['perception - Detectron2 / YOLO']},
        {t:'arrow',v:'detections'},
        {t:'row',v:['Mission classes']},
        {t:'arrow',v:'thruster commands'},
        {t:'text',v:'back into the simulated vehicle'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['ROS2','C++','Python','Gazebo','Detectron2','YOLO','OpenCV','Git']},
      {kind:'see',items:['reliaquest','drift-zero']}
    ]},

  { slug:'summit-analytics', section:'Experience', label:'Summit Analytics', abbr:'SWE', title:'Summit Analytics',
    role:'Software Engineering Intern · Gainesville, FL', meta:['May 2025 – Aug 2025','Python','Supabase','TypeScript'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Developed a scalable LinkedIn data scraper using async I/O and BeautifulSoup, automating ingestion into Supabase via REST APIs and improving throughput by 40%.',
        'Built a natural-language-to-SQL AI agent using Supabase (PostgreSQL) and the OpenAI Agents SDK, enabling real-time querying that cut ad-hoc data requests to engineering by ~50%.',
        'Created an LLM-driven CSV parser powered by Gemini Flash with TypeScript to normalize and ingest unstructured client data, reducing preprocessing time by 60% and compute cost by 35%.'
      ]},
      {kind:'h',text:'INGESTION TO QUERY'},
      {kind:'pre',text:D([
        {t:'row',v:['async scraper','LLM CSV parser']},
        {t:'arrow'},
        {t:'row',v:['Supabase - PostgreSQL']},
        {t:'arrow',v:'analyst question'},
        {t:'row',v:['NL→SQL agent']},
        {t:'arrow'},
        {t:'row',v:['query results']}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['Python','asyncio','BeautifulSoup','Supabase','PostgreSQL','TypeScript','OpenAI Agents SDK','Gemini Flash']},
      {kind:'see',items:['gatorai-ta','reliaquest']}
    ]},

  { slug:'gatorai-ta', section:'Experience', label:'GatorAI - AI Teaching Assistant', abbr:'LEAD', title:'GatorAI - AI Teaching Assistant',
    role:'Software Lead · Gainesville, FL', meta:['Aug 2025 – Dec 2025','Team of 6','RAG','PEFT/LoRA'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Led a team of 6 engineers to design and deploy an AI Teaching Assistant, developing RAG, fine-tuning, and guardrailing methods used across 3+ courses.',
        'Architected the end-to-end system integrating LlamaIndex, ChromaDB, and Whisper into a scalable RAG pipeline with Canvas LTI integration, serving responses in under 3 seconds per query.',
        'Fine-tuned domain-specific LLM models using PEFT/LoRA and implemented Guardrails.ai, reducing off-topic and hallucinated responses by ~40%.',
        'Conducted code reviews and enforced Git workflows across the team.'
      ]},
      {kind:'h',text:'RAG PIPELINE'},
      {kind:'pre',text:D([
        {t:'row',v:['lecture audio → Whisper','course documents']},
        {t:'arrow'},
        {t:'row',v:['LlamaIndex ingest']},
        {t:'arrow'},
        {t:'row',v:['ChromaDB vector store']},
        {t:'arrow',v:'retrieve · student query via Canvas LTI'},
        {t:'row',v:['fine-tuned LLM - PEFT / LoRA']},
        {t:'arrow'},
        {t:'row',v:['Guardrails.ai']},
        {t:'arrow'},
        {t:'text',v:'answer in under 3 seconds'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['LlamaIndex','ChromaDB','Whisper','PEFT/LoRA','Guardrails.ai','Canvas LTI','Python','Jira']},
      {kind:'see',items:['gatorai-corp','summit-analytics']}
    ]},

  { slug:'gatorai-corp', section:'Experience', label:'GatorAI - Corporate Relations', abbr:'DIR', title:'GatorAI - Corporate Relations',
    role:'Director of Corporate Relations · Gainesville, FL', meta:['Aug 2025 – May 2026','Partnerships'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Managing corporate partnerships and sponsor outreach for one of the largest AI/ML student organizations at University of Florida.'
      ]},
      {kind:'see',items:['gatorai-ta']}
    ]},

  { slug:'florida-tech-pathways', section:'Experience', label:'Florida Tech Pathways', abbr:'ANLY', title:'Florida Tech Pathways',
    role:'Analyst · Gainesville, FL', meta:['Sep 2025 – Dec 2025'],
    blocks:[
      {kind:'para',text:'Analyst role, September to December 2025, in Gainesville, Florida.'},
      {kind:'see',items:['summit-analytics']}
    ]},

  { slug:'drift-zero', section:'Projects', label:'Drift Zero', abbr:'WIN', title:'Drift Zero - Satellite Threat Intelligence Platform',
    role:'SCI Hackathon 2026 Winner · led a team of 4', meta:['2026','Databricks','FastAPI','IsolationForest'],
    blocks:[
      {kind:'para',text:'Drift Zero ingests two-line element sets for satellite constellations, detects maneuver events, and scores operator behavior to flag adversarial activity in orbit.'},
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Led a team of 4 to design and deploy a Databricks ETL pipeline for TLE ingestion and maneuver event detection using SQL window functions, plus operator behavioral profiling to gauge self-clearing likelihood across constellations.',
        'Engineered 4 adversarial satellite detection modules (incident reconstruction, mission mismatch, resurrection detection, economic impact scoring) using IsolationForest and z-score anomaly detection on orbital element deltas.',
        'Extended the FastAPI REST backend with 8+ endpoints for real-time anomaly querying and wrote 1,500+ lines of integration tests validating 5 external data sources.'
      ]},
      {kind:'h',text:'ARCHITECTURE'},
      {kind:'pre',text:D([
        {t:'text',v:'TLE feeds - 5 external sources'},
        {t:'arrow'},
        {t:'row',v:['Databricks ETL']},
        {t:'note',v:'SQL window functions → maneuver events'},
        {t:'arrow',v:'orbital element deltas'},
        {t:'row',v:['incident','mission','resurrect','economic']},
        {t:'note',v:'IsolationForest + z-score anomaly detection'},
        {t:'arrow'},
        {t:'row',v:['FastAPI - 8+ endpoints']},
        {t:'arrow'},
        {t:'text',v:'operator behavioral profiles'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['Databricks','SQL','Python','FastAPI','IsolationForest','scikit-learn','pytest','Vercel']},
      {kind:'links',items:[{label:'Live demo',href:'https://drift-zero-blond.vercel.app/'},{label:'GitHub',href:'https://github.com/eshadesigns/Drift-Zero'}]},
      {kind:'see',items:['machine-intelligence-lab','wikiroute']}
    ]},

  { slug:'gradient-attributions', section:'Projects', label:'Gradient-Based Attributions', abbr:'RSCH', title:'Gradient-Based Attributions - Neural Network Interpretability',
    role:'PyTorch, ResNet50', meta:['Integrated Gradients','IDG','ImageNet'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Reimplemented Integrated Gradients (Sundararajan et al.) and Integrated Decision Gradients (Walker, Jha et al.) from scratch in PyTorch, with no external attribution libraries, to attribute a pretrained ResNet50\u2019s ImageNet predictions at the pixel level.',
        'Implemented IDG\u2019s confidence-derivative importance weighting over an m-step Riemann path integral to counter gradient saturation, producing sharper, decision-centric heatmaps than standard IG.'
      ]},
      {kind:'h',text:'ATTRIBUTION PATH'},
      {kind:'pre',text:D([
        {t:'text',v:'ImageNet input · baseline'},
        {t:'arrow'},
        {t:'row',v:['pretrained ResNet50']},
        {t:'arrow',v:'m-step Riemann path integral'},
        {t:'row',v:['Integrated Gradients','Integrated Decision Gradients']},
        {t:'arrow',v:'confidence-derivative weighting'},
        {t:'row',v:['pixel attribution heatmap']}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['PyTorch','ResNet50','NumPy','ImageNet']},
      {kind:'links',items:[{label:'GitHub',href:'https://github.com/taherakolawala/gradient-based-attributions'}]},
      {kind:'see',items:['chestnet']}
    ]},

  { slug:'wikiroute', section:'Projects', label:'WikiRoute', abbr:'C++', title:'WikiRoute - Wikipedia Graph Pathfinding Engine',
    role:'C++, Python, Streamlit', meta:['100,000 pages','Dijkstra','Dial\u2019s algorithm'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Built a scalable C++/Python system modeling Wikipedia\u2019s top 100,000 ranked pages as a directed graph, implementing Dijkstra\u2019s and Dial\u2019s shortest-path algorithms in C++ for high-performance traversal.',
        'Benchmarked algorithm runtime and memory performance across large-scale graph queries with an interactive Streamlit UI.'
      ]},
      {kind:'h',text:'TRAVERSAL'},
      {kind:'pre',text:D([
        {t:'text',v:'top 100,000 Wikipedia pages'},
        {t:'arrow'},
        {t:'row',v:['directed link graph']},
        {t:'arrow'},
        {t:'row',v:['Dijkstra - C++','Dial\u2019s - C++']},
        {t:'arrow',v:'runtime + memory benchmarks'},
        {t:'row',v:['Streamlit UI']}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['C++','Python','Streamlit','Graph algorithms']},
      {kind:'links',items:[{label:'GitHub',href:'https://github.com/taherakolawala/WikiRoute'}]},
      {kind:'see',items:['drift-zero','fastbook']}
    ]},

  { slug:'browser4all', section:'Projects', label:'Browser4ALL', abbr:'SEMI', title:'Browser4ALL - Voice Browser Automation',
    role:'Shell Hacks 2025 Semifinalist', meta:['2025','asyncio','ElevenLabs','browser-use'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Architected a multi-threaded Python system using asyncio with browser-use for browser automation, streaming voice I/O, and multiple API integrations (OpenAI, ElevenLabs).',
        'Engineered a stateful AI agent with custom context management and 50+ functions for multi-step web navigation and error recovery.',
        'Designed a full-stack orchestration pipeline with dynamic API cost management and a custom tkinter UI for real-time visual feedback.'
      ]},
      {kind:'h',text:'AGENT LOOP'},
      {kind:'pre',text:D([
        {t:'text',v:'voice in'},
        {t:'arrow'},
        {t:'row',v:['speech-to-text']},
        {t:'arrow'},
        {t:'row',v:['stateful agent - 50+ functions']},
        {t:'arrow'},
        {t:'row',v:['browser-use driver']},
        {t:'arrow',v:'page state back into context'},
        {t:'row',v:['text-to-speech - ElevenLabs']},
        {t:'arrow'},
        {t:'text',v:'voice out'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['Python','asyncio','browser-use','OpenAI','ElevenLabs','tkinter']},
      {kind:'links',items:[{label:'GitHub',href:'https://github.com/taherakolawala/Browser4All'}]},
      {kind:'see',items:['gatorai-ta','legalease']}
    ]},

  { slug:'chestnet', section:'Projects', label:'ChestNet', abbr:'CNN', title:'ChestNet - Thoracic Disease Classification',
    role:'Python, TensorFlow, Keras, Pandas, NumPy', meta:['ChestMNIST','14 classes','AUC 0.7353'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Developed a custom CNN to detect and classify 14 thoracic diseases from chest radiography images using the ChestMNIST dataset.',
        'Implemented adaptive learning rate scheduling and early stopping, achieving 94.8% binary accuracy and a Test AUC of 0.7353.',
        'Evaluated class imbalance impacts and sensitivity limitations for rare pathologies, informing recommendations for clinical integration.'
      ]},
      {kind:'h',text:'PIPELINE'},
      {kind:'pre',text:D([
        {t:'text',v:'ChestMNIST radiographs'},
        {t:'arrow'},
        {t:'row',v:['preprocessing']},
        {t:'arrow'},
        {t:'row',v:['custom CNN']},
        {t:'note',v:'adaptive LR scheduling · early stopping'},
        {t:'arrow'},
        {t:'row',v:['14 thoracic disease classes']},
        {t:'arrow'},
        {t:'text',v:'94.8% binary accuracy · Test AUC 0.7353'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['Python','TensorFlow','Keras','Pandas','NumPy']},
      {kind:'links',items:[{label:'GitHub',href:'https://github.com/taherakolawala/chestnet'}]},
      {kind:'see',items:['gradient-attributions']}
    ]},

  { slug:'legalease', section:'Projects', label:'LegalEase', abbr:'EXT', title:'LegalEase - Plain-English Terms of Service',
    role:'Python, Flask, JavaScript, HTML, CSS', meta:['Chrome extension','GPT-4','Flask API'],
    blocks:[
      {kind:'h',text:'WORK'},
      {kind:'bullets',items:[
        'Developed a Chrome Extension using the chrome.tabs API to extract Terms of Service text and send it asynchronously to a Flask backend.',
        'Built an AI service leveraging GPT-4 to summarize legal text into plain-English bullet points and flag risky clauses on data collection and liability.',
        'Implemented a robust Flask API with structured JSON output, detailed error handling, and specific HTTP codes for client clarity.'
      ]},
      {kind:'h',text:'REQUEST PATH'},
      {kind:'pre',text:D([
        {t:'text',v:'Terms of Service page'},
        {t:'arrow'},
        {t:'row',v:['Chrome extension - chrome.tabs']},
        {t:'arrow',v:'async request'},
        {t:'row',v:['Flask API']},
        {t:'arrow'},
        {t:'row',v:['GPT-4 summarizer']},
        {t:'arrow'},
        {t:'text',v:'plain-English bullets · risky clauses flagged'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['Python','Flask','JavaScript','GPT-4','Chrome APIs']},
      {kind:'see',items:['browser4all']}
    ]},

  { slug:'fastbook', section:'Projects', label:'Fastbook', abbr:'HACK', title:'Fastbook - Textbook Problem Linker',
    role:'Swamphacks 2025 · built with a team', meta:['Jan 2025','Python','Streamlit'],
    blocks:[
      {kind:'para',text:'Fastbook is a simple tool that auto-links textbook problems and solutions in a PDF, built with a team for Swamphacks 2025.'},
      {kind:'h',text:'FLOW'},
      {kind:'pre',text:D([
        {t:'text',v:'textbook PDF'},
        {t:'arrow'},
        {t:'row',v:['problem / solution matcher']},
        {t:'arrow'},
        {t:'row',v:['Streamlit viewer']},
        {t:'arrow'},
        {t:'text',v:'auto-linked problems and solutions'}
      ])},
      {kind:'h',text:'STACK'},
      {kind:'tags',items:['Python','Streamlit']},
      {kind:'see',items:['wikiroute']}
    ]}
];

const SECTIONS = ['Experience','Leadership & Involvement','Projects'];
const THEMES = [
  {id:'amber',label:'Amber'},{id:'paper',label:'Paper'}
];
const STATIC_CHARS = ['░','▒','▓','█','·',' '];
const FONT = {
  A:['01110','10001','10001','11111','10001','10001','10001'],
  E:['11111','10000','10000','11110','10000','10000','11111'],
  H:['10001','10001','10001','11111','10001','10001','10001'],
  K:['10001','10010','10100','11000','10100','10010','10001'],
  L:['10000','10000','10000','10000','10000','10000','11111'],
  O:['01110','10001','10001','10001','10001','10001','01110'],
  R:['11110','10001','10001','11110','10100','10010','10001'],
  T:['11111','00100','00100','00100','00100','00100','00100'],
  W:['10001','10001','10001','10101','10101','11011','10001']
};
  return { ENTRIES, SECTIONS, THEMES, STATIC_CHARS, FONT };
})();
