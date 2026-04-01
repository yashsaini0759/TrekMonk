import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

function highlight(text: string) {
  const keywords = ['Kedarkantha', 'Himalayan', 'summit', 'snow', 'pine', '3,810', 'Govind'];
  let result = text;
  keywords.forEach(kw => {
    result = result.replace(new RegExp(`(${kw})`, 'gi'), '<span class="highlight">$1</span>');
  });
  return result;
}

const TrekAbout: React.FC<Props> = ({ trek }) => {
  const [expanded, setExpanded] = useState(false);
  const about = trek.details?.about ?? '';
  const paragraphs = about.split('\n\n').filter(Boolean);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <div className="td-section">
      <h2 className="td-section__title">About This Trek</h2>
      <div className="td-about__text">
        {visible.map((p, i) => (
          <p
            key={i}
            style={{ marginBottom: '1rem' }}
            dangerouslySetInnerHTML={{ __html: highlight(p) }}
          />
        ))}
      </div>
      {paragraphs.length > 1 && (
        <button className="td-about__toggle" onClick={() => setExpanded(e => !e)}>
          {expanded ? 'Show Less' : 'Read More'}
          <FiChevronDown style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '.3s' }} />
        </button>
      )}
    </div>
  );
};

export default TrekAbout;
