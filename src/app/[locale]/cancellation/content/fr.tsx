import { BulletList } from '@/components/legal/LegalPageShell';

const standardCancellationPolicy = [
  {
    title: "Plus de 30 jours avant l'arrivée",
    body: 'Un acompte de 30 % sera facturé.',
  },
  {
    title: "Entre 15 et 30 jours avant l'arrivée",
    body: 'Un montant équivalent à 30 % du total de la réservation sera facturé et ne sera pas remboursable.',
  },
  {
    title: "Entre 7 et 15 jours avant l'arrivée",
    body: 'Un montant équivalent à 50 % du total de la réservation sera facturé et ne sera pas remboursable.',
  },
  {
    title: "Moins de 7 jours avant l'arrivée, no-show, ou départ anticipé",
    body: '100 % du montant de la réservation sera facturé et ne sera pas remboursable.',
  },
];

const nonRefundableSituations = [
  'Vol ou perte d’effets personnels',
  'Nuisances sonores dues aux voisins, à des rénovations ou à des travaux',
  "Entretien du bâtiment ou propreté des parties communes",
  'Insectes, nuisibles ou aléas naturels',
  "Problèmes de connexion internet non imputables à une mauvaise gestion de notre part",
  "Annulation ou report d'un événement",
  "Annulations de vol ou instabilité géopolitique générale sans restriction officielle",
];

const voucherPolicy = [
  'Les voyageurs recevront un bon d’achat non remboursable et non transférable, équivalent au montant payé',
  "Le bon est valable 12 mois à compter de la date d'arrivée initiale",
  'Aucun remboursement en espèces ne sera effectué dans ces conditions',
];

const paymentSchedule = [
  'Acompte de 30 % à la réservation',
  "20 % dus 15 jours avant l'arrivée",
  "50 % dus 7 jours avant l'arrivée",
  "Autorisation de dépôt de garantie prélevée la veille de l'arrivée, libérée 5 jours après le départ",
];

export default function CancellationContentFr() {
  return (
    <>
      <section className="mb-10" data-animate="fade-up" data-delay="1">
        <h2 className="font-head text-3xl font-bold text-black">Politique d’annulation standard</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-cream/50 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {standardCancellationPolicy.map((item) => (
              <div key={item.title} className="rounded-2xl border border-primary/10 bg-white p-5">
                <h3 className="font-semibold text-black">{item.title}</h3>
                <p className="mt-2 text-black/75 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="2">
        <h2 className="font-head text-3xl font-bold text-black">Situations non remboursables</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/75 leading-relaxed">
            Aucun remboursement ne sera accordé pour des événements échappant au contrôle de
            l'entreprise, notamment (liste non exhaustive) :
          </p>
          <div className="mt-5">
            <BulletList items={nonRefundableSituations} />
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="3">
        <h2 className="font-head text-3xl font-bold text-black">
          Événements géopolitiques et perturbations de vols – Politique de bon d’achat
        </h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/75 leading-relaxed">
            En cas d'interdiction de voyager, de fermeture d'aéroport ou de suspension de vols
            officiellement déclarées par les autorités :
          </p>
          <div className="mt-5">
            <BulletList items={voucherPolicy} />
          </div>
        </div>
      </section>

      <section data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">Échéancier de paiement</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <div className="rounded-2xl border border-secondary/20 bg-cream p-6">
            <h3 className="font-head text-2xl font-semibold text-black">Échéancier de paiement (réservations directes)</h3>
            <div className="mt-5">
              <BulletList items={paymentSchedule} />
            </div>
          </div>

          <p className="mt-6 text-black/80 leading-relaxed">
            L'entreprise se réserve le droit d'annuler ou de reloger les réservations non
            intégralement réglées avant l'arrivée.
          </p>
        </div>
      </section>
    </>
  );
}
