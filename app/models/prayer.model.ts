export interface Prayer {
  id: string;
  body: string;
  username: string | null | undefined;
  givenName?: string | null | undefined;
  surname?: string | null | undefined;
  email?: string;
  avatarUrl?: string | null | undefined;
  cell?: string | null | undefined;
  avatar?: string | null | undefined;
  saved?: any;
  isSavedInPrayerList?: any;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  cellId?: string;
  prayingCount: number | null;
  prayerStats?: PrayerStats;
}

export interface PrayerStats {
  userAvatarUrls: string[];
  relevantSupporter: string;
  prayingCount: number;
}
