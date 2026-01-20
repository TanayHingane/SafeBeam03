import { Shield, Zap, Globe, Eye, UserX, FileType } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "End-to-end encryption keeps your files safe from prying eyes.",
  },
  {
    icon: UserX,
    title: "No Sign-Up",
    description: "Start transferring instantly. No accounts, no hassle.",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description: "Works on any device, any browser. No limits.",
  },
  {
    icon: Eye,
    title: "Real-Time Preview",
    description: "Preview files before downloading with live updates.",
  },
  {
    icon: Zap,
    title: "Instant Transfer",
    description: "Lightning-fast P2P transfers with no server storage.",
  },
  {
    icon: FileType,
    title: "All File Types",
    description: "Send any file format, from documents to videos.",
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">SafeBeam03</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for privacy, designed for simplicity. Experience file sharing
            the way it should be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl border border-neutral-300 dark:border-neutral-800 p-6 hover:border-neutral-300 dark:hover:border-neutral-700  transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4  transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
