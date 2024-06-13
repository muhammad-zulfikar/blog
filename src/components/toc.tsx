import { useEffect, useState } from 'react';

interface TOCProps {
  content: React.ReactNode;
}

const TableOfContents = ({ content }: TOCProps) => {
  const [title, setTitle] = useState<string>('');
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const tocHeadings: Array<{ id: string; text: string; level: number }> = [];
    const elements = document.querySelectorAll('h2, h3, h4, h5, h6');

    elements.forEach((element) => {
      const level = parseInt(element.tagName[1]);
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

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className='toc-title'>{title}</h1>
      <nav className="toc">
        <ul>
          {headings.map((heading) => (
            <li key={heading.id} className={`toc-level-${heading.level}`}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default TableOfContents;
