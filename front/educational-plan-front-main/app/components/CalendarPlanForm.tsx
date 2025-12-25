'use client';

import { useState } from 'react';
import '../../styles/CalendarPlan.css';


export function CalendarPlanForm({ onSave }: { onSave: (data: any) => void }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [group, setGroup] = useState('');
  const [profile, setProfile] = useState('');
  const [reg, setReg] = useState('');

  const submit = (e: any) => {
    e.preventDefault();

    onSave({
      title,
      academic_year: year,
      group,
      profile,
      reg_number: reg,
      courses: [
        { course: 1, weeks: Array(52).fill('') }
      ]
    });


    setTitle('');
    setYear('');
    setGroup('');
    setProfile('');
    setReg('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <input placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Учебный год" value={year} onChange={e => setYear(e.target.value)} />
      <input placeholder="Группа" value={group} onChange={e => setGroup(e.target.value)} />
      <input placeholder="Профиль" value={profile} onChange={e => setProfile(e.target.value)} />
      <input placeholder="Рег. №" value={reg} onChange={e => setReg(e.target.value)} />
      <button className="calendar-plan__actions" type="submit">Создать</button>
    </form>
  );
}



// 'use client';
//
// import { useState } from 'react';
//
// type Props = {
//   initial?: any;
//   onSave: (data: any) => void;
// };
//
// export function CalendarPlanForm({ initial, onSave }: Props) {
//   const [title, setTitle] = useState(initial?.title ?? '');
//   const [year, setYear] = useState(initial?.year ?? '');
//   const [group, setGroup] = useState(initial?.group ?? '');
//   const [profile, setProfile] = useState(initial?.profile ?? '');
//   const [regNumber, setRegNumber] = useState(initial?.reg_number ?? '');
//   const [courses, setCourses] = useState<number>(initial?.courses ?? 1);
//
// console.log('VALIDATION CHECK', {
//   title,
//   year,
//   group,
//   profile,
//   regNumber,
//   courses,
//   title_ok: title.trim().length > 0,
//   year_ok: String(year).trim().length > 0,
//   group_ok: group.trim().length > 0,
//   profile_ok: profile.trim().length > 0,
//   reg_ok: regNumber.trim().length > 0,
//   courses_ok: Number.isInteger(courses) && courses > 0,
// });
//
//
//   const isValid =
//     title.trim().length > 0 &&
//     String(year).trim().length > 0 &&
//     group.trim().length > 0 &&
//     profile.trim().length > 0 &&
//     regNumber.trim().length > 0 &&
//     Number.isInteger(courses) &&
//     courses > 0;
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//
//     if (!isValid) {
//       alert('Заполните все поля календарного учебного графика');
//       return;
//     }
//
//     onSave({
//       title,
//       year,
//       group,
//       profile,
//       reg_number: regNumber,
//       courses_count: Number(courses),
//       data: initial?.data ?? {
//         courses: Array.from({ length: Number(courses) }, (_, i) => ({
//           course: i + 1,
//           weeks: Array(52).fill(''),
//         })),
//       },
//     });
//   };
//
//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: 'flex',
//         gap: 8,
//         flexWrap: 'wrap',
//         marginBottom: 16,
//       }}
//     >
//       <input
//         placeholder="Полное название"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//
//       <input
//         placeholder="Учебный год"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//       />
//
//       <input
//         placeholder="Группа"
//         value={group}
//         onChange={(e) => setGroup(e.target.value)}
//       />
//
//       <input
//         placeholder="Направленность (профиль)"
//         value={profile}
//         onChange={(e) => setProfile(e.target.value)}
//       />
//
//       <input
//         placeholder="Регистрационный номер"
//         value={regNumber}
//         onChange={(e) => setRegNumber(e.target.value)}
//       />
//
//       <input
//         type="number"
//         min={1}
//         placeholder="Количество курсов"
//         value={courses}
//         onChange={(e) => setCourses(Number(e.target.value))}
//       />
//
//       <button type="submit" disabled={!isValid}>
//         Сохранить
//       </button>
//     </form>
//   );
// }
