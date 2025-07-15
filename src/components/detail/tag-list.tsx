'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagListProps {
  tags: string[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  showFilter?: boolean;
  contentType?: 'project' | 'writing';
  variant?: 'default' | 'interactive' | 'filter';
  className?: string;
}

export function TagList({
  tags,
  selectedTags = [],
  onTagClick,
  onTagRemove,
  showFilter = false,
  contentType,
  variant = 'default',
  className
}: TagListProps) {
  const router = useRouter();
  const [isFilterMode, setIsFilterMode] = useState(false);

  const handleTagClick = (tag: string) => {
    if (variant === 'filter' || isFilterMode) {
      // Filter mode - toggle tag selection
      if (selectedTags.includes(tag)) {
        onTagRemove?.(tag);
      } else {
        onTagClick?.(tag);
      }
    } else if (variant === 'interactive') {
      // Interactive mode - navigate to filtered content
      if (contentType) {
        const basePath = contentType === 'project' ? '/projects' : '/writings';
        router.push(`${basePath}?tag=${encodeURIComponent(tag)}`);
      } else {
        onTagClick?.(tag);
      }
    } else {
      // Default mode - just call the callback
      onTagClick?.(tag);
    }
  };

  const handleRemoveTag = (tag: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onTagRemove?.(tag);
  };

  const toggleFilterMode = () => {
    setIsFilterMode(!isFilterMode);
  };

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Filter Toggle */}
      {showFilter && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Tags</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFilterMode}
            className={cn(
              'flex items-center gap-2 text-xs',
              isFilterMode && 'text-primary'
            )}
          >
            <Filter className="w-3 h-3" />
            {isFilterMode ? 'Exit Filter' : 'Filter Mode'}
          </Button>
        </div>
      )}

      {/* Selected Tags (in filter mode) */}
      {(variant === 'filter' || isFilterMode) && selectedTags.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Selected:</span>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="flex items-center gap-1 cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => handleRemoveTag(tag, {} as React.MouseEvent)}
              >
                {tag}
                <X className="w-3 h-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* All Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const isClickable = variant !== 'default' || onTagClick;
          
          return (
            <Badge
              key={tag}
              variant={isSelected ? 'default' : 'secondary'}
              className={cn(
                'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isClickable && 'cursor-pointer hover:scale-105',
                variant === 'interactive' && 'hover:bg-primary hover:text-primary-foreground',
                (variant === 'filter' || isFilterMode) && [
                  'hover:bg-primary/20 hover:border-primary/40',
                  isSelected && 'bg-primary text-primary-foreground'
                ],
                !isClickable && 'cursor-default'
              )}
              onClick={isClickable ? () => handleTagClick(tag) : undefined}
              role={isClickable ? 'button' : 'note'}
              tabIndex={isClickable ? 0 : -1}
              onKeyDown={isClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTagClick(tag);
                }
              } : undefined}
              aria-label={
                isClickable 
                  ? `${isSelected ? 'Remove' : 'Add'} ${tag} tag filter`
                  : `Tag: ${tag}`
              }
              aria-pressed={isClickable && (variant === 'filter' || isFilterMode) ? isSelected : undefined}
            >
              {tag}
              {(variant === 'filter' || isFilterMode) && isSelected && (
                <X 
                  className="w-3 h-3 ml-1" 
                  onClick={(e) => handleRemoveTag(tag, e)}
                />
              )}
            </Badge>
          );
        })}
      </div>

      {/* Clear All (in filter mode) */}
      {(variant === 'filter' || isFilterMode) && selectedTags.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedTags.forEach(tag => onTagRemove?.(tag))}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      )}
    </div>
  );
}

// Utility component for simple tag display
export function SimpleTags({ 
  tags, 
  className 
}: { 
  tags: string[]; 
  className?: string; 
}) {
  return (
    <TagList 
      tags={tags} 
      variant="default" 
      className={className}
    />
  );
}

// Utility component for interactive tags that navigate
export function InteractiveTags({ 
  tags, 
  contentType, 
  className 
}: { 
  tags: string[]; 
  contentType: 'project' | 'writing';
  className?: string; 
}) {
  return (
    <TagList 
      tags={tags} 
      variant="interactive" 
      contentType={contentType}
      className={className}
    />
  );
}

// Utility component for filterable tags
export function FilterableTags({ 
  tags, 
  selectedTags, 
  onTagSelect, 
  onTagRemove, 
  className 
}: { 
  tags: string[]; 
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  className?: string; 
}) {
  return (
    <TagList 
      tags={tags} 
      selectedTags={selectedTags}
      onTagClick={onTagSelect}
      onTagRemove={onTagRemove}
      variant="filter"
      showFilter
      className={className}
    />
  );
}