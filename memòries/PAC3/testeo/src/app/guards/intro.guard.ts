import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export const INTRO_KEY = 'intro-seen';

export const introGuard: CanMatchFn = async (route, segments) => {
  const router = inject(Router);
  const hasSeenIntro = await Preferences.get({ key: INTRO_KEY });

  if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
    return true;
  } else {
    router.navigateByUrl('/intro', { replaceUrl: true });
    return false;
  }
};