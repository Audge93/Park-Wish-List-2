import React from 'react';
import { PARKS } from '../constants';
import { useAppStore } from '../store';
import AttractionCard from '../components/AttractionCard';

export default function Onboarding() {
  const step = useAppStore((s) => s.onboardingStep);
  const next = useAppStore((s) => s.nextOnboarding);
  const complete = useAppStore((s) => s.completeOnboarding);
  const activePark = useAppStore((s) => s.activePark);
  const setActivePark = useAppStore((s) => s.setActivePark);
  const attractions = useAppStore((s) => s.attractions);
  const park = PARKS.find((p) => p.slug === activePark);
  const iconic = attractions.filter((a) => a.parkSlug === activePark && a.tier === 1).slice(0, 8);

  if (step === 0) {
    return (
      <div className="onboarding dark">
        <div className="sparkle">✦</div>
        <h1>Don’t miss a thing.</h1>
        <p>Plan what you want to eat, do, and experience before you arrive.</p>
        <button className="primary wide" onClick={next}>Let’s get started</button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="onboarding">
        <h1>Which park are you planning first?</h1>
        <p>You can switch parks anytime.</p>
        <div className="park-grid">
          {PARKS.map((p) => (
            <button className="park-tile" key={p.slug} onClick={() => { setActivePark(p.slug); next(); }} style={{ background: `linear-gradient(135deg, ${p.theme}, #1A1814)` }}>
              <span>{p.icon}</span>
              <strong>{p.shortName}</strong>
              <small>{p.name}</small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding">
      <h1>What’s the one thing you can’t miss?</h1>
      <p>{park?.name} has so much to offer. Start with one thing.</p>
      <div className="date-card">
        <strong>When are you visiting {park?.name}?</strong>
        <p>Prototype placeholder: trip date scheduling will connect to reminders later.</p>
      </div>
      <div className="horizontal-cards">
        {iconic.map((a) => <AttractionCard key={a.id} attraction={a} />)}
      </div>
      <button className="primary wide" onClick={complete}>Take me to my list ✨</button>
      <button className="text-btn" onClick={complete}>Skip for now</button>
    </div>
  );
}
