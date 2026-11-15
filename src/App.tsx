import { CoffeeSection } from './components/CoffeeSection';
import { Hero } from './components/Hero';
import { NotesSection } from './components/NotesSection';
import { Numbers } from './components/Numbers';
import { RouteSection } from './components/RouteSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { Watch } from './components/Watch';

export function App() {
  return (
    <>
      <a href="#watch" className="skipLink">
        Skip to the episode
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Numbers />
        <Watch />
        <RouteSection />
        <CoffeeSection />
        <NotesSection />
      </main>
      <SiteFooter />
    </>
  );
}
