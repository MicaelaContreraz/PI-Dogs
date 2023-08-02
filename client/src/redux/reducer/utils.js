/*~~~~~~~~~~~~~~ORDERS~~~~~~~~~~~~~~*/
export const orderDogs = (payload, array) => {
  switch (payload) {
    case "AscendingName":
      return array.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    case "DescendingName":
      return array.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      case "AscendingWeight":
        return array.sort((a, b) => {

          const weightA = a.weight.split('-').map(value => parseInt(value))
          const weightB = b.weight.split('-').map(value => parseInt(value))

        return (
         Math.floor( ( weightB[0] + weightB[1]) / 2 - (weightA[0] + weightA[1]) / 2)
        );
      });
      case "DescendingWeight":
      return array.sort((a, b) => {
        
        const weightA = a.weight.split('-').map(value => parseInt(value))
        const weightB = b.weight.split('-').map(value => parseInt(value))

      return (
       Math.floor( ( weightA[0] + weightA[1]) / 2 - (weightB[0] + weightB[1]) / 2)
      );
    })
    default:
      return array;
  }
};

/*~~~~~~~~~~~~~~FILTERS~~~~~~~~~~~~~~*/
export const filterDogs = (payload, array) => {
  switch (payload) {
    case "Existing":
      return array.filter((el) => !el.createdInDB);
    case "Created":
      return array.filter((el) => el.createdInDB === true);
    default:
      return array;
  }
};
