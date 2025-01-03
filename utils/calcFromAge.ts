export const calcFromAge = (brithDate: string, maxAge: number) => {
  const totalWeeks = 52 * maxAge;
  const birthDate = new Date(brithDate);
  const currentDate = new Date();
  const weeksSinceBirth = Math.floor(
    (currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  return {
    totalWeeks,
    weeksSinceBirth,
  };
};
