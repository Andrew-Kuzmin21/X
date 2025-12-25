'use client';

import { useState } from 'react';
import '../../styles/CalendarPlan.css';

type Course = {
  course: number;
  weeks: string[];
};

type PlanData = {
  title: string;
  academic_year: string;
  group: string;
  profile: string;
  reg_number: string;
  courses: Course[];
};

type Props = {
  plan: any;
  onSave: (data: PlanData) => void;
};

const WEEK_AUTUMN = 23;
const WEEK_SPRING = 29;
const WEEK_COUNT = 52;
const MAX_COURSES = 6;

function normalizePlanData(raw: any): PlanData {
  if (raw && Array.isArray(raw.courses)) {
    return {
      title: raw.title ?? '',
      academic_year: raw.academic_year ?? '',
      group: raw.group ?? '',
      profile: raw.profile ?? '',
      reg_number: raw.reg_number ?? '',
      courses: raw.courses.map((c: any, i: number) => ({
        course: c.course ?? i + 1,
        weeks: Array.isArray(c.weeks)
          ? c.weeks
          : Array(WEEK_COUNT).fill(''),
      })),
    };
  }

  return {
    title: '',
    academic_year: '',
    group: '',
    profile: '',
    reg_number: '',
    courses: [{ course: 1, weeks: Array(WEEK_COUNT).fill('') }],
  };
}

const count = (weeks: string[], codes: string[]) =>
  weeks.filter((w) => codes.includes(w)).length;

export function CalendarPlanGrid({ plan, onSave }: Props) {
  const [data, setData] = useState<PlanData>(
    normalizePlanData(plan?.data)
  );

  const courses = Array.isArray(data.courses) ? data.courses : [];

  const setCoursesCount = (n: number) => {
    const next: Course[] = [];
    for (let i = 1; i <= n; i++) {
      next.push({
        course: i,
        weeks: courses[i - 1]?.weeks ?? Array(WEEK_COUNT).fill(''),
      });
    }
    setData({ ...data, courses: next });
  };

  const updateWeek = (ci: number, wi: number, v: string) => {
    const next = courses.map((c, i) =>
      i === ci
        ? { ...c, weeks: c.weeks.map((w, j) => (j === wi ? v : w)) }
        : c
    );
    setData({ ...data, courses: next });
  };

  const isValid =
    data.title &&
    data.academic_year &&
    data.group &&
    data.profile &&
    data.reg_number;

  return (
    <div className="calendar-plan">
      <h3>Календарный учебный график</h3>

      {/* ШАПКА */}
      <div className="calendar-plan__header">
        <label>
          Название:
          <input placeholder="Название" value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })} />
        </label>
        <label>
          Учебный год:
        <input placeholder="Учебный год" value={data.academic_year}
          onChange={(e) => setData({ ...data, academic_year: e.target.value })} />
        </label>
        <label>
          Группа:
        <input placeholder="Группа" value={data.group}
          onChange={(e) => setData({ ...data, group: e.target.value })} />
        </label>
        <label>
          Профиль:
        <input placeholder="Профиль" value={data.profile}
          onChange={(e) => setData({ ...data, profile: e.target.value })} />
        </label>
        <label>
          Рег. номер:
        <input placeholder="Рег. номер" value={data.reg_number}
          onChange={(e) => setData({ ...data, reg_number: e.target.value })} />
        </label>


        <label>
          Количество курсов:
          <select value={courses.length}
            onChange={(e) => setCoursesCount(+e.target.value)}>
            {Array.from({ length: MAX_COURSES }, (_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
      </div>

      {/* ТАБЛИЦА */}
      <table className="calendar-plan__table">
        <thead>
          <tr>
            <th rowSpan={2}>Курс</th>
            <th colSpan={WEEK_AUTUMN}>Осенний семестр</th>
            <th colSpan={WEEK_SPRING}>Весенний семестр</th>
            <th colSpan={3}>Теория</th>
            <th rowSpan={2}>Экз.</th>
            <th rowSpan={2}>Уч.</th>
            <th rowSpan={2}>Друг.</th>
            <th rowSpan={2}>Предд.</th>
            <th rowSpan={2}>НИР</th>
            <th rowSpan={2}>ГИА</th>
            <th rowSpan={2}>Каник.</th>
            <th rowSpan={2}>Всего</th>
          </tr>
          <tr>
            {Array.from({ length: WEEK_COUNT }, (_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
            <th>О</th><th>В</th><th>Σ</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c, ci) => {
            const autumn = c.weeks.slice(0, WEEK_AUTUMN);
            const spring = c.weeks.slice(WEEK_AUTUMN);

            const theoryO = count(autumn, ['']);
            const theoryV = count(spring, ['']);

            return (
              <tr key={c.course}>
                <td>{c.course}</td>
                {c.weeks.map((w, wi) => (
                  <td key={wi}>
                    <input
                      className="calendar-plan__week-input"
                      value={w}
                      maxLength={1}
                      onChange={(e) =>
                        updateWeek(ci, wi, e.target.value.toUpperCase())
                      }
                    />
                  </td>
                ))}
                <td className="calendar-plan__summary">{theoryO}</td>
                <td className="calendar-plan__summary">{theoryV}</td>
                <td className="calendar-plan__summary">{theoryO + theoryV}</td>
                <td>{count(c.weeks, ['С'])}</td>
                <td>{count(c.weeks, ['У'])}</td>
                <td>{count(c.weeks, ['П'])}</td>
                <td>{count(c.weeks, ['Д'])}</td>
                <td>{count(c.weeks, ['Н'])}</td>
                <td>{count(c.weeks, ['Г'])}</td>
                <td>{count(c.weeks, ['='])}</td>
                <td className="calendar-plan__summary">{WEEK_COUNT}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ЛЕГЕНДА */}
      <div className="calendar-plan__legend">
        <div>С — экзаменационная сессия</div>
        <div>У — учебная практика</div>
        <div>П — другие практики</div>
        <div>Д — преддипломная практика</div>
        <div>Н — НИР</div>
        <div>Г — ГИА</div>
        <div>= — каникулы</div>
        <div>(пусто) — теоретическое обучение</div>
      </div>

      <div className="calendar-plan__actions">
        <button onClick={() => isValid ? onSave(data) : alert('Заполните шапку')}>
          Сохранить календарный план
        </button>
      </div>
    </div>
  );
}
