export const checkResponse = respond => {
   if (respond.ok) {
    return respond.json();
  }
  else { Promise.reject(`Ошибка: ${respond.status}`) }
}