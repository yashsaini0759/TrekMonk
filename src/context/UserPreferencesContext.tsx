import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Trek, Region, Difficulty } from '../data/trekData';

export interface UserPreferences {
  clickedTreks: string[];       // trek IDs, newest first
  preferredRegions: Region[];
  preferredTags: string[];
  preferredDifficulty: Difficulty[];
  lastViewedName?: string;       // label: "Because you viewed X"
  lastSearchQuery?: string;      // last search term used
  activeTrekId?: string;         // the trek currently being viewed
}

interface UserPreferencesContextValue {
  preferences: UserPreferences;
  recordClick: (trek: Trek) => void;
  recordSearch: (query: string) => void;
  refreshKey: number;
  refreshRecommendations: () => void;
}

const DEFAULT_PREFS: UserPreferences = {
  clickedTreks: [],
  preferredRegions: [],
  preferredTags: [],
  preferredDifficulty: [],
  lastSearchQuery: '',
  activeTrekId: undefined,
};

const STORAGE_KEY = 'tm_user_prefs';

function loadPrefs(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

function savePrefs(prefs: UserPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch { /* ignore */ }
}

const UserPreferencesContext = createContext<UserPreferencesContextValue>({
  preferences: DEFAULT_PREFS,
  recordClick: () => {},
  recordSearch: () => {},
  refreshKey: 0,
  refreshRecommendations: () => {},
});

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(loadPrefs);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => { savePrefs(preferences); }, [preferences]);

  const recordClick = useCallback((trek: Trek) => {
    setPreferences(prev => {
      const clickedTreks = prev.clickedTreks.includes(trek.id)
        ? [trek.id, ...prev.clickedTreks.filter(id => id !== trek.id)].slice(0, 20)
        : [trek.id, ...prev.clickedTreks].slice(0, 20);

      const addUnique = <T,>(arr: T[], item: T, max = 10) =>
        arr.includes(item) ? arr : [item, ...arr].slice(0, max);

      return {
        ...prev,
        clickedTreks,
        activeTrekId: trek.id,
        preferredRegions: addUnique(prev.preferredRegions, trek.region) as Region[],
        preferredDifficulty: addUnique(prev.preferredDifficulty, trek.difficulty) as Difficulty[],
        preferredTags: [...new Set([...trek.tags, ...prev.preferredTags])].slice(0, 30),
        lastViewedName: trek.name,
      };
    });
    // Auto-refresh the recommendation carousel on every click
    setRefreshKey(k => k + 1);
  }, []);

  const recordSearch = useCallback((query: string) => {
    setPreferences(prev => ({
      ...prev,
      lastSearchQuery: query,
    }));
  }, []);

  const refreshRecommendations = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, recordClick, recordSearch, refreshKey, refreshRecommendations }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => useContext(UserPreferencesContext);
