export const validateEmail = email => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@+k+a+n+g+w+o+n+.+a+c+.+k+r/;
  return regex.test(email);
  };
  
  export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  };
  
