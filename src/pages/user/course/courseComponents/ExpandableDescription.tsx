import { useState } from "react";

interface ExpandableInterface {
    description: string,
    maxWords: number,
}
const ExpandableDescription: React.FC<ExpandableInterface> = ({ description, maxWords }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const words = description?.split(' ') || [];
    const shortDescription = words.slice(0, maxWords).join(' ');
    const isLongDescription = words.length > maxWords;
  
    return (
      <div className="text-gray-600 mb-4">
        <p>
          {isExpanded ? description : shortDescription}
          {isLongDescription && !isExpanded && '...'}
        </p>
        {isLongDescription && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 mt-2"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    );
  };
  

  export default ExpandableDescription;