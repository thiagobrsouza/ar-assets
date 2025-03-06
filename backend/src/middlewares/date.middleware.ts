function dateTimeMiddleware<T>(data: T | T[]): T | T[] {
  const convertDates = (item: any) => {
    for (const key in item) {
      if (item[key] instanceof Date) {
        item[key] = item[key].toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      }
    }
    return item;
  };

  if (Array.isArray(data)) {
    return data.map(convertDates);
  }

  if (data && typeof data === 'object') {
    return convertDates(data);
  }

  return data;
}

export { dateTimeMiddleware };

