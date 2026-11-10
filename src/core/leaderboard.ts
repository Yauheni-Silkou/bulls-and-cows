export interface RecordEntry {
  attempts: number;
  time: number;
  date: string;
}

export const getLeaderboardKey = (length: number, base: number): string => {
  return `bulls_cows_records_${length}_${base}`;
};

export const getRecords = (length: number, base: number): RecordEntry[] => {
  const key = getLeaderboardKey(length, base);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveRecord = (
  length: number,
  base: number,
  attempts: number,
  time: number
): RecordEntry[] => {
  const key = getLeaderboardKey(length, base);
  const records = getRecords(length, base);

  const newEntry: RecordEntry = {
    attempts,
    time,
    date: new Date().toLocaleDateString(),
  };

  const updatedRecords = [...records, newEntry]
    .sort((a, b) => a.attempts - b.attempts || a.time - b.time)
    .slice(0, 5);

  localStorage.setItem(key, JSON.stringify(updatedRecords));
  return updatedRecords;
};
