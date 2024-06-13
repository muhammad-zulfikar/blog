import { useEffect, useState } from 'react';

interface TOCProps {
  content: React.ReactNode;
}

const TableOfContents = ({ content }: TOCProps) => {
  const [title, setTitle] = useState<string>('');
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const tocHeadings: Array<{ id: string; text: string; level: number }> = [];
    const elements = document.querySelectorAll('h2, h3, h4, h5, h6');

    elements.forEach((element) => {
      const level = parseInt(element.tagName[1]!);
      const text = element.textContent || '';
      const id = element.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      element.id = id;
      tocHeadings.push({ id, text, level });
    });

    setHeadings(tocHeadings);

    const h1Element = document.querySelector('h1');
    if (h1Element) {
      setTitle(h1Element.textContent || '');
    }
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -72% 0%' }
    );

    const elements = document.querySelectorAll('h2, h3, h4, h5, h6');
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <div className="toc-container custom-card p-2 rounded-xl text-xs">
        <h1 className='toc-title'>{title}</h1>
        <nav className="toc">
          <ul>
            {headings.map((heading) => (
              <li key={heading.id} className={`toc-level-${heading.level}`}>
                <a
                  href={`#${heading.id}`}
                  className={heading.id === activeId ? 'active' : ''}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableOfContents;