import * as XLSX from 'xlsx';

const WEEK_COUNT = 52;

export function exportCalendarPlan(plan: any) {
  const data = plan.data;
  if (!data || !Array.isArray(data.courses)) {
    alert('Нет данных для экспорта');
    return;
  }

  const rows: any[][] = [];

  /** ---------- Заголовок документа ---------- */
  rows.push(['КАЛЕНДАРНЫЙ УЧЕБНЫЙ ГРАФИК']);
  rows.push([`Название: ${data.title}`]);
  rows.push([`Учебный год: ${data.academic_year}`]);
  rows.push([`Группа: ${data.group}`]);
  rows.push([`Профиль: ${data.profile}`]);
  rows.push([`Регистрационный номер: ${data.reg_number}`]);
  rows.push([]);

  /** ---------- Заголовки таблицы ---------- */
  rows.push([
    'Курс',
    ...Array.from({ length: WEEK_COUNT }, (_, i) => `${i + 1}`),
    'О',
    'В',
    'Итого',
    'Экз',
    'Уч. практ.',
    'Другие практ.',
    'Преддипл.',
    'НИР',
    'ГИА',
    'Каникулы',
    'Всего',
  ]);

  /** ---------- Итоги ---------- */
  const totals = {
    theoryAutumn: 0,
    theorySpring: 0,
    theoryTotal: 0,
    exams: 0,
    study: 0,
    other: 0,
    pre: 0,
    nir: 0,
    gia: 0,
    holidays: 0,
    total: 0,
  };

  /** ---------- Строки курсов ---------- */
  data.courses.forEach((course: any) => {
    const weeks = course.weeks ?? Array(WEEK_COUNT).fill('');

    const autumnWeeks = weeks.slice(0, 23);
    const springWeeks = weeks.slice(23);

    const isTheory = (w: string) => w === '' || w === 'С';
    const count = (v: string) => weeks.filter((w) => w === v).length;

    const theoryAutumn = autumnWeeks.filter(isTheory).length;
    const theorySpring = springWeeks.filter(isTheory).length;
    const theoryTotal = theoryAutumn + theorySpring;

    const exams = count('С');
    const study = count('У');
    const other = count('П');
    const pre = count('Д');
    const nir = count('Н');
    const gia = count('Г');
    const holidays = count('=');

    const total =
      theoryTotal + study + other + pre + nir + gia + holidays;

    // строка курса
    rows.push([
      course.course,
      ...weeks,
      theoryAutumn,
      theorySpring,
      theoryTotal,
      exams,
      study,
      other,
      pre,
      nir,
      gia,
      holidays,
      total,
    ]);

    // накопление итогов
    totals.theoryAutumn += theoryAutumn;
    totals.theorySpring += theorySpring;
    totals.theoryTotal += theoryTotal;
    totals.exams += exams;
    totals.study += study;
    totals.other += other;
    totals.pre += pre;
    totals.nir += nir;
    totals.gia += gia;
    totals.holidays += holidays;
    totals.total += total;
  });

  /** ---------- Итоговая строка ---------- */
  rows.push([
    'Итого',
    ...Array(WEEK_COUNT).fill(''),
    totals.theoryAutumn,
    totals.theorySpring,
    totals.theoryTotal,
    totals.exams,
    totals.study,
    totals.other,
    totals.pre,
    totals.nir,
    totals.gia,
    totals.holidays,
    totals.total,
  ]);

  /** ---------- Пустая строка ---------- */
  rows.push([]);

  /** ---------- Легенда ---------- */
  rows.push(['Условные обозначения:']);
  rows.push(['С — экзаменационная сессия']);
  rows.push(['У — учебная практика']);
  rows.push(['П — производственная практика']);
  rows.push(['Д — преддипломная практика']);
  rows.push(['Г — государственная итоговая аттестация']);
  rows.push(['= — каникулы']);
  rows.push(['Н — НИР']);
  rows.push(['(пусто) — теоретическое обучение']);

  /** ---------- Excel ---------- */
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Календарный график');
  XLSX.writeFile(workbook, `${'Календарный_учебный_график_' + data.group + '_' + data.academic_year || 'calendar_plan'}.xlsx`);
}
