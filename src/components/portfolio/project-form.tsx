import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BUDGETS, CATEGORIES, PLATFORMS, briefSchema, prepareProjectEmail } from '@/lib/project-brief';

export function ProjectForm() {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { ...Object.fromEntries(new FormData(event.currentTarget)), ...choices };
    const result = briefSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { const key = String(issue.path[0]); if (!next[key]) next[key] = issue.message; });
      setErrors(next);
      setPrepared(false);
      return;
    }
    setErrors({});
    window.location.href = prepareProjectEmail(result.data);
    setPrepared(true);
  }
  function field(name: string, label: string, child: ReactNode, optional = false) {
    return <div className="space-y-2"><label htmlFor={`brief-${name}`} className="text-sm font-medium">{label}{optional ? <span className="ml-2 text-xs text-muted-foreground">Optional</span> : <span className="ml-1 text-primary" aria-hidden="true">*</span>}</label>{child}{errors[name] && <p id={`error-${name}`} className="text-xs text-destructive">{errors[name]}</p>}</div>;
  }
  function select(name: string, label: string, options: readonly string[]) {
    return field(name, label, <Select value={choices[name] || ''} onValueChange={value => setChoices(c => ({ ...c, [name]: value }))}><SelectTrigger id={`brief-${name}`} className="brief-input" aria-required="true" aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `error-${name}` : undefined}><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>);
  }
  const input = (name: string, type: string, placeholder: string, maxLength = 100) => <Input className="brief-input" id={`brief-${name}`} name={name} type={type} placeholder={placeholder} maxLength={maxLength} aria-required={name !== 'reference'} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `error-${name}` : undefined} autoComplete={name === 'name' || name === 'email' ? name : undefined} />;
  return <form onSubmit={submit} noValidate className="project-form glass rounded-2xl p-6 sm:p-9">
    <div className="mb-7 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Mail size={19} /></span><h3 className="text-xl font-semibold">Your project brief</h3></div>
    <div className="grid gap-5 sm:grid-cols-2">
      {field('name', 'Your name', input('name', 'text', 'Full name'))}
      {field('email', 'Email address', input('email', 'email', 'you@company.com', 254))}
      {select('category', 'Content category', CATEGORIES)}
      {select('platform', 'Platform', PLATFORMS)}
      {field('length', 'Video length', input('length', 'text', 'e.g. 8–12 minutes'))}
      {select('budget', 'Budget range (USD)', BUDGETS)}
      {field('deadline', 'Deadline', input('deadline', 'text', 'e.g. November 15, or flexible'))}
      {field('reference', 'Reference link', input('reference', 'url', 'https://…', 500), true)}
      <div className="sm:col-span-2">{field('details', 'Project details', <Textarea id="brief-details" name="details" rows={5} maxLength={2500} className="brief-input h-auto min-h-32 resize-y" placeholder="What are you creating? Share the goal, style, footage and scope." aria-required="true" aria-invalid={!!errors['details']} aria-describedby={errors['details'] ? 'error-details' : undefined} />)}</div>
    </div>
    <Button type="submit" size="lg" className="mt-6 h-12 w-full rounded-xl">Prepare project email <ArrowUpRight /></Button>
    <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">Your email app will open with your brief. Review it and send when ready.<br />Nothing is sent or stored by this website.</p>
    <div aria-live="polite">{Object.keys(errors).length > 0 && <p className="mt-4 text-sm text-destructive">Please complete the required fields above.</p>}{prepared && <p className="mt-4 flex items-start gap-2 text-sm text-primary-glow"><Check size={17} className="mt-0.5 shrink-0" />Brief prepared. If no email app opened, configure one on your device or email CrazyKrack directly.</p>}</div>
  </form>;
}
