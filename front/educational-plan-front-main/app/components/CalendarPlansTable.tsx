'use client';

import { useCalendarPlans } from '../hooks/useCalendarPlans';
import { CalendarPlanForm } from './CalendarPlanForm';
import { CalendarPlanGrid } from './CalendarPlanGrid';
import '../../styles/CalendarPlan.css';

type Props = {
  educationalPlanId: number;
};

export function CalendarPlansTable({ educationalPlanId }: Props) {
  const { plans, loading, createPlan, updatePlan, deletePlan } =
    useCalendarPlans(educationalPlanId);

  return (
    <div>
      <h3
          style={{
            marginBottom: 16,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Календарный учебный график
        </h3>


      <CalendarPlanForm onSave={createPlan} />

      {loading && <div>Загрузка...</div>}

      {plans.map((plan) => (
        <div key={plan.id} style={{ marginTop: 24, padding: 16, background: '#fff' }}>
          <CalendarPlanGrid
            plan={plan}
            onSave={(data) => updatePlan(plan.id, data)}
          />

          <div className="calendar-plan__actions">
            <button className="calendar-plan__actions" onClick={() => deletePlan(plan.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
}


// 'use client';
//
// import { useEffect, useState } from 'react';
//
// type Course = {
//   course: number;
//   weeks: string[];
// };
//
// type PlanData = {
//   title: string;
//   academic_year: string;
//   group: string;
//   profile: string;
//   reg_number: string;
//   courses: Course[];
// };
//
// type Props = {
//   plan: any;
//   onSave: (data: PlanData) => void;
// };
//
// const WEEK_AUTUMN = 23;
// const WEEK_SPRING = 29;
// const WEEK_COUNT = 52;
// const MAX_COURSES = 6;
//
// const ALLOWED_CODES = ['', 'С', 'У', 'П', 'Д', 'Н', 'Г', '='];
//
// /** нормализация данных */
// function normalizePlanData(raw: any): PlanData {
//   if (typeof raw === 'string') {
//     try {
//       raw = JSON.parse(raw);
//     } catch {
//       raw = null;
//     }
//   }
//
//   if (raw && Array.isArray(raw.courses)) {
//     return {
//       title: raw.title ?? '',
//       academic_year: raw.academic_year ?? '',
//       group: raw.group ?? '',
//       profile: raw.profile ?? '',
//       reg_number: raw.reg_number ?? '',
//       courses: raw.courses.map((c: any, i: number) => ({
//         course: Number(c.course) || i + 1,
//         weeks: Array.isArray(c.weeks)
//           ? c.weeks.slice(0, WEEK_COUNT)
//           : Array(WEEK_COUNT).fill(''),
//       })),
//     };
//   }
//
//   return {
//     title: '',
//     academic_year: '',
//     group: '',
//     profile: '',
//     reg_number: '',
//     courses: [{ course: 1, weeks: Array(WEEK_COUNT).fill('') }],
//   };
// }
//
//
// function countWeeks(weeks: string[], codes: string[]) {
//   return weeks.filter((w) => codes.includes(w)).length;
// }
//
// export function CalendarPlanGrid({ plan, onSave }: Props) {
//   const [data, setData] = useState<PlanData>(
//       normalizePlanData(plan?.data)
//     );
//
//     useEffect(() => {
//       if (plan) {
//         setData(normalizePlanData(plan.data));
//       }
//     }, [plan?.id]);
//
//
//
//   if (!data) {
//     return <div>Загрузка календарного плана...</div>;
//   }
//
//   const courses = data.courses;
//
//   const setCoursesCount = (count: number) => {
//     const newCourses: Course[] = [];
//
//     for (let i = 1; i <= count; i++) {
//       newCourses.push({
//         course: i,
//         weeks: courses[i - 1]?.weeks ?? Array(WEEK_COUNT).fill(''),
//       });
//     }
//
//     setData({ ...data, courses: newCourses });
//   };
//
//   const updateWeek = (ci: number, wi: number, value: string) => {
//     setData({
//       ...data,
//       courses: courses.map((c, i) =>
//         i === ci
//           ? {
//               ...c,
//               weeks: c.weeks.map((w, j) =>
//                 j === wi ? value : w
//               ),
//             }
//           : c
//       ),
//     });
//   };
//
//   const isValid = () =>
//     Boolean(
//       data.title &&
//         data.academic_year &&
//         data.group &&
//         data.profile &&
//         data.reg_number &&
//         courses.length > 0
//     );
//
//   const handleSave = () => {
//     if (!isValid()) {
//       alert('Заполните все обязательные поля');
//       return;
//     }
//     onSave(data);
//   };
//
//   console.log('PLAN FROM API', plan);
//
//
//   return (
//     <div>
//       <h3>Календарный учебный график</h3>
//
//       {/* Шапка */}
//       <div style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
//         <input placeholder="Полное название" value={data.title}
//           onChange={(e) => setData({ ...data, title: e.target.value })} />
//         <input placeholder="Учебный год" value={data.academic_year}
//           onChange={(e) => setData({ ...data, academic_year: e.target.value })} />
//         <input placeholder="Группа" value={data.group}
//           onChange={(e) => setData({ ...data, group: e.target.value })} />
//         <input placeholder="Профиль" value={data.profile}
//           onChange={(e) => setData({ ...data, profile: e.target.value })} />
//         <input placeholder="Регистрационный номер" value={data.reg_number}
//           onChange={(e) => setData({ ...data, reg_number: e.target.value })} />
//
//         <label>
//           Количество курсов:
//           <select value={courses.length}
//             onChange={(e) => setCoursesCount(Number(e.target.value))}>
//             {Array.from({ length: MAX_COURSES }, (_, i) => (
//               <option key={i + 1} value={i + 1}>{i + 1}</option>
//             ))}
//           </select>
//         </label>
//       </div>
//
//       {/* Таблица */}
//       <table border={1} cellPadding={4} style={{ marginTop: 16 }}>
//         <tbody>
//           {courses.map((course, ci) => (
//             <tr key={course.course}>
//               <td>{course.course}</td>
//               {course.weeks.map((w, wi) => (
//                 <td key={wi}>
//                   <input
//                     value={w}
//                     maxLength={1}
//                     style={{ width: 22, textAlign: 'center' }}
//                     onChange={(e) => {
//                       const val = e.target.value.toUpperCase();
//                       if (ALLOWED_CODES.includes(val)) {
//                         updateWeek(ci, wi, val);
//                       }
//                     }}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//
//       <button style={{ marginTop: 16 }} onClick={handleSave}>
//         Сохранить календарный план
//       </button>
//     </div>
//   );
// }
