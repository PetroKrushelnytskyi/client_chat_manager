export const classNames = (
    ...classes: (string | boolean | undefined | null)[]
  ) => classes.filter(Boolean).join(' ');
  
  export const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (bytes / 1024).toFixed(2) + ' KB';
    }
  };
  