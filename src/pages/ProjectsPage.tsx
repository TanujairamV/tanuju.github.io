import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';

// Define the interface based on the Github API response structure
interface GitRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const ProjectsPage = () => {
  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Specifically pulling user's actual repos mapped in the request
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Rohan-Saieswar/repos');
        const data = await response.json();
        // Sort by stars, then generic filter to drop empty ones if desired. 
        // Showing specifically the requested ones first + sorting rest
        const priorityRepos = ['linux', 'Grade12', 'pacman-contribution-graph', 'Rohansaieswarkonda.github.io'];
        
        const sortedData = data.sort((a: GitRepo, b: GitRepo) => {
          if (priorityRepos.includes(a.name) && !priorityRepos.includes(b.name)) return -1;
          if (!priorityRepos.includes(a.name) && priorityRepos.includes(b.name)) return 1;
          return b.stargazers_count - a.stargazers_count;
        });

        setRepos(sortedData);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const languageColors: Record<string, string> = {
    Python: '#3572A5',
    TypeScript: '#3178c6',
    C: '#555555',
    HTML: '#e34c26'
  };

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
             <Github size={40} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Open Source Projects</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            A collection of my code repositories, experiments, and contributions directly from GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
             <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="repo-card"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {repo.name} <ExternalLink size={16} style={{ color: 'var(--text-muted)'}} />
                  </a>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flexGrow: 1, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {repo.description || 'No description provided.'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {repo.language && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: languageColors[repo.language] || '#ccc' }}></span>
                      {repo.language}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Star size={14} /> {repo.stargazers_count}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GitFork size={14} /> {repo.forks_count}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .repo-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-color) !important;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
