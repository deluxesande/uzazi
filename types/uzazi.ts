export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface UzaziMotherRecord {
  id: string;
  name: string;
  postpartumDay: number; // 1-42
  riskLevel: RiskLevel;
  missedCheckIns: number;
  lastActive: string; // ISO string representation of timestamp
  nightCompanionTriggered: boolean;
  trustedContactNotified: boolean;
}

export interface CheckInResponse {
  questionId: string;
  answerValue: number;
}
