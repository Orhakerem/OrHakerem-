/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { BulletList } from '@/components/legal/LegalPageShell';

const paymentSchedule = [
  'Acompte de 30 % à la réservation',
  "20 % dus 15 jours avant l'arrivée",
  "50 % dus 7 jours avant l'arrivée",
  "Autorisation de dépôt de garantie prélevée la veille de l'arrivée, libérée 5 jours après le départ",
];

const guestResponsibilities = [
  "Présenter un passeport valide et un visa d'entrée lors du check-in",
  'Assumer l’entière responsabilité de tout dommage causé pendant le séjour',
  "Éteindre l'éclairage, la climatisation et les appareils en quittant le logement",
  "S'abstenir de fumer, d'organiser des événements ou d'amener des animaux",
  'Utiliser le logement avec respect et responsabilité',
  'Respecter la réglementation locale sur le bruit et le voisinage',
  'Signaler immédiatement tout dommage, dysfonctionnement ou problème',
];

const companyResponsibilities = [
  "Garantir un nettoyage professionnel du logement avant l'arrivée",
  'Fournir du linge de maison et des serviettes adaptés au nombre de voyageurs déclarés',
  'Répondre aux problèmes de maintenance dans des délais raisonnables',
  'Reloger le voyageur dans un logement équivalent ou supérieur, ou proposer un remboursement, si le logement devient inhabitable',
  "Annuler une réservation lorsque le comportement du voyageur ou des soldes impayés présentent un risque pour le logement ou l'entreprise",
];

const companyLimitations = [
  "Le vol ou l'endommagement d'effets personnels",
  "Le bruit ou les nuisances provenant de l'immeuble ou des alentours",
  'Les insectes, nuisibles ou perturbations environnementales',
  "Les événements échappant à son contrôle (force majeure ou perturbations imputables à des tiers)",
  "L'annulation ou la modification d'événements tiers ayant motivé le séjour",
];

const insuranceCoverage = [
  "L'annulation de voyage",
  'Les urgences médicales',
  'Les perturbations de vol',
  'La force majeure et les risques géopolitiques',
];

export default function TermsContentFr({ cancellationHref }: { cancellationHref: string }) {
  return (
    <>
      <section className="mb-10" data-animate="fade-up" data-delay="1">
        <h2 className="font-head text-3xl font-bold text-black">1. Politique d’annulation et de remboursement</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/80 leading-relaxed">
            Or Hakerem applique une politique d'annulation et de remboursement progressive selon le
            délai d'annulation, ainsi que des situations non remboursables définies et une
            politique de bon d'achat pour les perturbations de voyage officiellement déclarées.
          </p>
          <Link
            href={cancellationHref}
            className="mt-5 inline-flex items-center font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-light"
          >
            Consulter notre politique complète d'annulation et de remboursement
          </Link>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="2">
        <h2 className="font-head text-3xl font-bold text-black">2. Échéancier de paiement</h2>
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

      <section className="mb-10" data-animate="fade-up" data-delay="3">
        <h2 className="font-head text-3xl font-bold text-black">3. Responsabilités du voyageur</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <BulletList items={guestResponsibilities} />
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">4. Responsabilités d'Or Hakerem</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="font-head text-2xl font-semibold text-black">Or Hakerem s'engage à</h3>
            <div className="mt-5">
              <BulletList items={companyResponsibilities} />
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="font-head text-2xl font-semibold text-black">Or Hakerem n'est pas responsable de</h3>
            <div className="mt-5">
              <BulletList items={companyLimitations} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">5. Assurance voyage et clause géopolitique</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/80 leading-relaxed">
            Il est fortement recommandé aux voyageurs de souscrire une assurance voyage couvrant :
          </p>
          <div className="mt-5">
            <BulletList items={insuranceCoverage} />
          </div>

          <div className="mt-6 space-y-4 text-black/80 leading-relaxed">
            <p>
              Les tensions géopolitiques ou situations sécuritaires en Israël ne sont pas
              considérées comme un cas de force majeure, sauf déclaration officielle des autorités
              (par exemple : fermeture d'aéroport ou interdiction de voyager).
            </p>
            <p>Dans ce cas, les voyageurs recevront un bon d'achat conformément à la section 1.3.</p>
            <p>
              Or Hakerem n'est pas responsable des annulations fondées sur des préoccupations
              personnelles, sauf application de restrictions officielles.
            </p>
          </div>
        </div>
      </section>

      <section data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">6. Résiliation, pénalités et dépassement de durée</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <div className="space-y-4 text-black/80 leading-relaxed">
            <p>
              La période de location prend automatiquement fin à la date de départ convenue, sans préavis.
            </p>
            <p>
              Tout retard dans la libération du logement entraînera une pénalité équivalente à 2
              fois le tarif journalier par jour supplémentaire, jusqu'à la libération complète du
              logement et la restitution des clés.
            </p>
            <p>
              Tout manquement aux présentes Conditions Générales autorise Or Hakerem à mettre fin
              au séjour immédiatement, sans remboursement ni compensation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
