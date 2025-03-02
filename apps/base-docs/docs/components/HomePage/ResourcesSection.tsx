import { BookOpen, FileText, Users, Settings, Wrench } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: 'Guides',
    description: 'Comprehensive guides to help you build any app on Base.',
    link: '/guides'
  },
  {
    icon: Wrench,
    title: 'All Tools',
    description: 'Build any app on Base with our suite of developer tools.',
    link: '/get-started/explore-all-tools'
  },
  {
    icon: Users,
    title: 'Discord',
    description: 'Join our global community, get help, and meet builders.',
    link: 'https://discord.com/invite/buildonbase'
  },

];

export function ResourcesSection() {
  return (
    <div className="mt-24">
      <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-8">
        Additional resources
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <a
              key={resource.title}
              href={resource.link}
              className="group glass-effect rounded-md p-6 bg-zinc-50 dark:bg-black shadow-lg shadow-zinc-300/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-black transition-colors duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{resource.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
