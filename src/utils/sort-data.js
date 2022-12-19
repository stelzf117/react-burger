export const sortData = data => {
  const criteria =  ['bun', 'sauce', 'main'];
  const result = {
    bun: {},
    sauce: {},
    main: {}
  };

  for(let i = 0; i < 3 ; i++){
    result[criteria[i]] = data.filter(item => item.type === criteria[i])
  }
  return result;
}