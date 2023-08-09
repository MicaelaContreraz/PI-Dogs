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
      case "DescendingWeight":
        return array
          .filter(item => item.weight)
          .sort((a, b) => {
            const weightA = parseInt(a.weight.split('-')[1]); // Tomar el valor más alto del rango
            const weightB = parseInt(b.weight.split('-')[1]); // Tomar el valor más alto del rango
            return weightB - weightA; // Ordenar en orden descendente por el valor más alto
          });

          case "AscendingWeight":
            return array
              .filter(item => item.weight)
              .sort((a, b) => {
                const weightA = parseInt(a.weight.split('-')[1]); // Tomar el valor más bajo del rango
                const weightB = parseInt(b.weight.split('-')[1]); // Tomar el valor más bajo del rango
                return weightA - weightB; // Ordenar en orden ascendente por el valor más bajo
              });
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
