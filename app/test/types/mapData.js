export function mapData(data) {
  const common = {
    email: data.email,
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    name: data.name,
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    skills: data.skills,
    states: data.states,
    isTeacher: data.isTeacher,
    students: data.isTeacher ? data.students : [],
  };

  switch (data.variant) {
    case "create":
      return { ...common, variant: data.variant };
    case "edit":
      return { ...common, id: data.id, variant: data.variant };
    default:
      return common; // Ensure to return something in case no case matches
  }
}
