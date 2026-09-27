import { useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Gauge,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react'

const criteria = [
  { label: 'Impact & results', score: 86, color: 'bg-[#d6f36a]' },
  { label: 'Role keywords', score: 72, color: 'bg-[#ffc28c]' },
  { label: 'Clarity & format', score: 94, color: 'bg-[#b6d3ff]' },
]

function App() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function acceptFile(nextFile) {
    if (!nextFile) return
    const allowed = /\.(pdf|doc|docx)$/i.test(nextFile.name)
    if (!allowed) {
      setError('Choose a PDF, DOC, or DOCX file to continue.')
      setFile(null)
      return
    }
    if (nextFile.size > 10 * 1024 * 1024) {
      setError('Your file must be smaller than 10 MB.')
      setFile(null)
      return
    }
    setError('')
    setNotice('')
    setFile(nextFile)
  }

  function handleDrop(event) {
    event.preventDefault()
    setDragging(false)
    acceptFile(event.dataTransfer.files?.[0])
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f5f0] text-[#1e211c]">
      <header className="relative z-10 border-b border-[#1e211c]/10">
        <nav className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Draft home">
            <span className="grid size-9 place-items-center rounded-[11px] bg-[#d6f36a] text-[#1e211c]">
              <FileText size={19} strokeWidth={2.2} />
            </span>
            <span className="font-display text-[20px] font-extrabold tracking-[-1px]">draft<span className="text-[#8b9e4d]">.</span></span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            <a className="nav-link" href="#how-it-works">How it works</a>
            <a className="nav-link" href="#why-draft">Why Draft</a>
          </div>

          <a href="#upload" className="hidden items-center gap-2 rounded-full bg-[#1e211c] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#3a3e34] sm:flex">
            Review my resume <ArrowRight size={15} />
          </a>
          <button className="grid size-10 place-items-center rounded-full border border-[#1e211c]/15 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="absolute inset-x-0 top-full grid gap-1 border-b border-[#1e211c]/10 bg-[#f5f5f0] px-6 py-4 md:hidden">
            <a className="rounded-lg px-3 py-3 text-sm hover:bg-black/5" href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a className="rounded-lg px-3 py-3 text-sm hover:bg-black/5" href="#why-draft" onClick={() => setMenuOpen(false)}>Why Draft</a>
            <a className="rounded-lg bg-[#1e211c] px-3 py-3 text-sm text-white" href="#upload" onClick={() => setMenuOpen(false)}>Review my resume</a>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-[92px]">
          <div className="hero-copy relative z-[1]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#1e211c]/10 bg-white/55 px-3.5 py-2 text-[11px] font-medium tracking-[.02em] text-[#55594e]">
              <span className="size-1.5 rounded-full bg-[#8eaa3d]" />
              A better first draft starts here
            </div>
            <h1 className="font-display max-w-[650px] text-[54px] font-semibold leading-[.99] tracking-[-.075em] sm:text-[70px] lg:text-[100px]">
              Hey, let&apos;s get your resume <span className="relative inline-block whitespace-nowrap">noticed<span className="scribble" aria-hidden="true" /></span>.
            </h1>
            <p className="mt-7 max-w-[470px] text-[16px] leading-[1.75] text-[#66695f] sm:text-[17px]">
              Get your resume reviewed and get a score. Find out what&apos;s working, what&apos;s missing, and how to make your next move count.
            </p>

            <div id="upload" className={`mt-9 max-w-[520px] rounded-[18px] border bg-white p-2.5 shadow-[0_14px_50px_rgba(30,33,28,.07)] transition ${dragging ? 'border-[#8eaa3d] ring-4 ring-[#d6f36a]/35' : 'border-[#1e211c]/10'}`}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click() }}
                onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className="flex min-h-[98px] cursor-pointer items-center gap-4 rounded-[12px] border border-dashed border-[#1e211c]/20 px-4 py-4 transition hover:border-[#8eaa3d] sm:px-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-[13px] bg-[#f1f3e8] text-[#687936]">
                  {file ? <FileText size={22} /> : <ArrowDownRight size={22} />}
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-[14px] font-semibold">{file ? file.name : 'Drop your resume here'}</span>
                  <span className="mt-1 block text-[12px] text-[#85877f]">{file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB · Ready to review` : 'or browse files · PDF, DOC, DOCX · up to 10 MB'}</span>
                </span>
                {file && <button className="grid size-8 shrink-0 place-items-center rounded-full text-[#85877f] hover:bg-black/5 hover:text-[#1e211c]" aria-label="Remove selected file" onClick={(event) => { event.stopPropagation(); setFile(null); setError(''); setNotice('') }}><X size={16} /></button>}
                <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(event) => acceptFile(event.target.files?.[0])} />
              </div>
              {error && <p className="px-3 pt-2 text-[12px] text-[#b33d2e]" role="alert">{error}</p>}
              <button type="button" disabled={!file} onClick={() => setNotice('Your resume is ready. Scoring will be available when the review service is connected.')} className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#1e211c] px-5 py-4 text-[14px] font-semibold text-white transition hover:bg-[#3a3e34] disabled:cursor-not-allowed disabled:bg-[#1e211c]/35">
                {file ? 'Get my resume score' : 'Get my resume score'} <ArrowRight size={16} />
              </button>
              {notice && <p className="px-3 pt-2 text-[12px] text-[#687936]" role="status">{notice}</p>}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#777a70]">
              <span className="inline-flex items-center gap-1.5"><LockKeyhole size={12} /> Private by design</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} /> Your file stays yours</span>
              <span className="inline-flex items-center gap-1.5"><Check size={13} /> No account needed</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0">
            <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#d6f36a]/35 blur-[70px]" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#f3bd86]/25 blur-[65px]" aria-hidden="true" />
            <div className="relative rounded-[22px] border border-[#1e211c]/10 bg-white p-5 shadow-[0_30px_80px_rgba(30,33,28,.12)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#1e211c]/[.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-[12px] bg-[#f1f3e8]"><Gauge size={19} className="text-[#687936]" /></div>
                  <div><p className="text-[13px] font-semibold">Your resume snapshot</p><p className="mt-0.5 font-mono text-[10px] text-[#92948b]">A QUICK LOOK AT WHAT MATTERS</p></div>
                </div>
                <span className="rounded-full bg-[#f1f3e8] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[.08em] text-[#687936]">Example</span>
              </div>

              <div className="grid grid-cols-[132px_1fr] items-center gap-5 border-b border-[#1e211c]/[.08] py-6 sm:grid-cols-[158px_1fr] sm:gap-7">
                <div className="score-ring relative grid aspect-square place-items-center rounded-full">
                  <div className="grid size-[78%] place-items-center rounded-full bg-white text-center">
                    <div><span className="font-display text-[42px] font-semibold leading-none tracking-[-3px]">82</span><span className="ml-0.5 text-[12px] text-[#92948b]">/100</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[.1em] text-[#85877f]">Resume score</span></div>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[18px] font-semibold leading-tight tracking-[-.7px] sm:text-[20px]">A strong start.</p>
                  <p className="mt-2 text-[12px] leading-[1.65] text-[#777a70]">A few focused changes could make your experience stand out even more.</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f0] px-2.5 py-1.5 text-[10px] font-medium text-[#62665b]"><Sparkles size={12} className="text-[#8eaa3d]" /> Looking promising</div>
                </div>
              </div>

              <div className="space-y-[17px] pt-5">
                {criteria.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-[11px]"><span className="font-medium text-[#4c5046]">{item.label}</span><span className="font-mono text-[10px] text-[#777a70]">{item.score}%</span></div>
                    <div className="h-[5px] overflow-hidden rounded-full bg-[#f0f0eb]"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-[12px] bg-[#f5f5f0] px-4 py-3.5">
                <div className="flex items-center gap-2.5"><Target size={16} className="text-[#727c4f]" /><span className="text-[11px] font-medium">Built around your next role</span></div>
                <ChevronDown size={15} className="text-[#85877f]" />
              </div>
            </div>
            <div className="absolute -left-4 top-[43%] hidden items-center gap-2 rounded-full border border-[#1e211c]/[.08] bg-white px-3 py-2.5 text-[10px] font-medium shadow-[0_8px_25px_rgba(30,33,28,.08)] sm:flex lg:-left-9">
              <span className="grid size-6 place-items-center rounded-full bg-[#d6f36a]"><Check size={13} /></span> Clear, useful feedback
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-[#1e211c]/10 bg-[#eceee5]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-12 lg:py-[74px]">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><p className="eyebrow">THREE STEPS, ONE BETTER RESUME</p><h2 className="mt-3 font-display text-[34px] font-semibold tracking-[-1.8px] sm:text-[42px]">Make your next move clearer.</h2></div>
              <a href="#upload" className="mb-1 inline-flex items-center gap-2 text-[13px] font-semibold underline decoration-[#aab884] underline-offset-4 transition hover:text-[#687936]">Start with your resume <ArrowRight size={15} /></a>
            </div>
            <div className="mt-10 grid gap-0 md:grid-cols-3">
              {[
                { n: '01', title: 'Drop it in', body: 'Upload the resume you have today. PDF, DOC, or DOCX all work.', icon: FileText },
                { n: '02', title: 'See the signal', body: 'Get a simple score across the details recruiters look for.', icon: Gauge },
                { n: '03', title: 'Make it stronger', body: 'Walk away with clear next steps, not vague advice.', icon: Sparkles },
              ].map(({ n, title, body, icon: Icon }) => (
                <article key={n} className="relative border-t border-[#1e211c]/15 py-6 md:mr-7 md:py-7 md:last:mr-0">
                  <div className="flex items-center justify-between"><span className="font-mono text-[11px] text-[#8b8e83]">{n}</span><Icon size={17} strokeWidth={1.7} className="text-[#79854f]" /></div>
                  <h3 className="mt-5 font-display text-[21px] font-semibold tracking-[-.7px]">{title}</h3>
                  <p className="mt-2 max-w-[290px] text-[13px] leading-[1.7] text-[#70736a]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-draft" className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-12 text-[12px] text-[#777a70] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>Good work deserves to be seen.</p>
          <p className="font-mono text-[10px] tracking-[.06em]">YOUR NEXT CHAPTER, WELL DRAFTED.</p>
        </section>
      </main>
      <footer className="border-t border-[#1e211c]/10 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between"><a href="#top" className="font-display text-[16px] font-extrabold tracking-[-.7px]">draft<span className="text-[#8b9e4d]">.</span></a><span className="text-[11px] text-[#898b82]">A calmer way to get career-ready.</span></div>
      </footer>
    </div>
  )
}

export default App