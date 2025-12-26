import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCalendarPlans(educationalPlanId: number) {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!educationalPlanId) return;

    setLoading(true);
    const res = await fetch(`${API_URL}/calendar-plans`);
    const data = await res.json();

    // фильтруем по educational_plan_id
    const filtered = Array.isArray(data)
      ? data.filter((p) => p.educational_plan_id === educationalPlanId)
      : [];

    setPlans(filtered);
    setLoading(false);
  };


  const createPlan = async (data: any) => {
    await fetch(`${API_URL}/calendar-plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        educational_plan_id: educationalPlanId,
        data
      })
    });
    load();
  };

  const updatePlan = async (id: number, data: any) => {
    await fetch(`${API_URL}/calendar-plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    load();
  };

  const deletePlan = async (id: number) => {
    await fetch(`${API_URL}/calendar-plans/${id}`, {
      method: 'DELETE'
    });
    load();
  };

  useEffect(() => {
    load();
  }, [educationalPlanId]);

  return { plans, loading, createPlan, updatePlan, deletePlan };
}




// import { useEffect, useState } from 'react';
//
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
//
// export function useCalendarPlans(educationalPlanId: number) {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//
//   const load = async () => {
//     if (!educationalPlanId) return;
//
//     setLoading(true);
//     const res = await fetch(`${API_URL}/calendar-plans`);
//     const data = await res.json();
//
//     // фильтруем по educational_plan_id
//     const filtered = Array.isArray(data)
//       ? data.filter((p) => p.educational_plan_id === educationalPlanId)
//       : [];
//
//     setPlans(filtered);
//     setLoading(false);
//   };
//
//   const createPlan = async (data: any) => {
//     await fetch(`${API_URL}/calendar-plans`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         educational_plan_id: educationalPlanId,
//         data
//       })
//     });
//     load();
//   };
//
//   const updatePlan = async (id: number, data: any) => {
//     await fetch(`${API_URL}/calendar-plans/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ data })
//     });
//     load();
//   };
//
//   const deletePlan = async (id: number) => {
//     await fetch(`${API_URL}/calendar-plans/${id}`, {
//       method: 'DELETE'
//     });
//     load();
//   };
//
//   useEffect(() => {
//     load();
//   }, [educationalPlanId]);
//
//   return { plans, loading, createPlan, updatePlan, deletePlan };
// }
