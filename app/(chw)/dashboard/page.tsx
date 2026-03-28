import { UzaziMotherRecord } from '@/types/uzazi';

async function getTriageList(): Promise<UzaziMotherRecord[]> {
  return [
    {
      id: '1',
      name: 'Wanjiku Njoroge',
      postpartumDay: 14,
      riskLevel: 'HIGH',
      missedCheckIns: 3,
      lastActive: new Date(Date.now() - 3 * 86400000).toISOString(),
      nightCompanionTriggered: true,
      trustedContactNotified: true,
    },
    {
      id: '2',
      name: 'Kawira Mutegi',
      postpartumDay: 5,
      riskLevel: 'MEDIUM',
      missedCheckIns: 2,
      lastActive: new Date(Date.now() - 2 * 86400000).toISOString(),
      nightCompanionTriggered: false,
      trustedContactNotified: false,
    },
    {
      id: '3',
      name: 'Amina Hassan',
      postpartumDay: 22,
      riskLevel: 'LOW',
      missedCheckIns: 0,
      lastActive: new Date().toISOString(),
      nightCompanionTriggered: false,
      trustedContactNotified: false,
    },
    {
      id: '4',
      name: 'Njeri Kamau',
      postpartumDay: 8,
      riskLevel: 'HIGH',
      missedCheckIns: 0,
      lastActive: new Date(Date.now() - 3600000).toISOString(),
      nightCompanionTriggered: true,
      trustedContactNotified: false,
    },
    {
      id: '5',
      name: 'Muthoni Mwangi',
      postpartumDay: 35,
      riskLevel: 'LOW',
      missedCheckIns: 4,
      lastActive: new Date(Date.now() - 4 * 86400000).toISOString(),
      nightCompanionTriggered: true,
      trustedContactNotified: true,
    }
  ];
}

export default async function CHWDashboard() {
  const mothers = await getTriageList();

  const sortedMothers = [...mothers].sort((a, b) => {
    const getUrgencyScore = (m: UzaziMotherRecord) => {
      let score = 0;
      if (m.riskLevel === 'HIGH') score += 100;
      if (m.missedCheckIns > 2) score += 50;
      if (m.riskLevel === 'MEDIUM') score += 20;
      score += m.missedCheckIns;
      return score;
    };
    return getUrgencyScore(b) - getUrgencyScore(a);
  });

  return (
    <div className="min-h-screen bg-warmWhite p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b-2 border-deepPlum/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-deepPlum tracking-tight">
            Uzazi CHW Portal - Tharaka-Nithi County
          </h1>
          <p className="text-lg text-deepPlum/70 mt-2">
            Triage Dashboard & Case Management
          </p>
        </header>

        <div className="space-y-6">
          {sortedMothers.map((mother) => {
            const isHighRisk = mother.riskLevel === 'HIGH';
            const isMediumRisk = mother.riskLevel === 'MEDIUM';
            const isLowRisk = mother.riskLevel === 'LOW';

            let actionText = null;
            if (mother.missedCheckIns >= 3) {
              actionText = "ACTION: Request Home Visit";
            } else if (mother.missedCheckIns === 2) {
              actionText = "ACTION: SMS Trusted Contact";
            } else if (mother.missedCheckIns === 1) {
              actionText = "ACTION: Send Warm Nudge";
            }

            const borderColor = isHighRisk || mother.missedCheckIns > 2 
              ? 'border-rosePink' 
              : isMediumRisk 
                ? 'border-warmAmber' 
                : 'border-mintGreen';

            return (
              <div 
                key={mother.id} 
                className={`bg-white border-l-8 ${borderColor} shadow-sm p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6`}
              >
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-deepPlum">{mother.name}</h2>
                    <span className="text-sm font-semibold text-deepPlum/60 uppercase tracking-wider">
                      Day {mother.postpartumDay} Postpartum
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {isHighRisk && (
                      <span className="bg-rosePink text-deepPlum px-3 py-1 text-sm font-bold uppercase tracking-wider">
                        High Risk
                      </span>
                    )}
                    {isMediumRisk && (
                      <span className="bg-warmAmber/20 text-warmAmber px-3 py-1 text-sm font-bold uppercase tracking-wider">
                        Medium Risk
                      </span>
                    )}
                    {isLowRisk && (
                      <span className="bg-mintGreen/20 text-mintGreen px-3 py-1 text-sm font-bold uppercase tracking-wider">
                        Low Risk
                      </span>
                    )}

                    {actionText && (
                      <span className="bg-deepPlum/10 text-deepPlum px-3 py-1 text-sm font-bold uppercase tracking-wider">
                        {actionText}
                      </span>
                    )}

                    {mother.nightCompanionTriggered && (
                      <span className="bg-nightBlue/10 text-nightBlue px-3 py-1 text-sm font-semibold">
                        Note: 3AM AI Support Activated
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-deepPlum/70 lg:text-right">
                  <div>
                    <span className="uppercase text-xs font-semibold tracking-wider opacity-70 mr-2">Missed Check-ins:</span>
                    <span className={`font-bold ${mother.missedCheckIns > 0 ? 'text-rosePink' : 'text-mintGreen'}`}>
                      {mother.missedCheckIns}
                    </span>
                  </div>
                  <div>
                    <span className="uppercase text-xs font-semibold tracking-wider opacity-70 mr-2">Last Active:</span>
                    <span className="font-medium">
                      {new Date(mother.lastActive).toLocaleDateString()} at {new Date(mother.lastActive).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
