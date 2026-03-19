export const getCollegeById = (colleges, collegeId) =>
  colleges.find((college) => college.id === collegeId);

export const enrichEvents = (events, colleges) =>
  events.map((event) => ({
    ...event,
    college:
      getCollegeById(colleges, event.collegeId)?.name ?? "Unknown College",
  }));

export const filterEvents = (events, filters) => {
  const { search, category, location, college, fromDate, toDate } = filters;

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    const searchMatch =
      !search ||
      [event.title, event.description, event.location, event.college]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch = !category || event.category === category;
    const locationMatch = !location || event.location === location;
    const collegeMatch = !college || event.college === college;
    const fromDateMatch = !fromDate || eventDate >= new Date(fromDate);
    const toDateMatch = !toDate || eventDate <= new Date(toDate);

    return (
      searchMatch &&
      categoryMatch &&
      locationMatch &&
      collegeMatch &&
      fromDateMatch &&
      toDateMatch
    );
  });
};

export const recommendEvents = (events, studentProfile) => {
  const interests = studentProfile.interests.map((interest) =>
    interest.toLowerCase(),
  );
  const branch = studentProfile.branch.toLowerCase();

  return [...events]
    .map((event) => {
      const interestScore = event.interests.reduce(
        (score, interest) =>
          interests.includes(interest.toLowerCase()) ? score + 3 : score,
        0,
      );
      const branchScore = event.branchFocus
        .map((focus) => focus.toLowerCase())
        .includes(branch)
        ? 4
        : 0;
      const featuredScore = event.featured ? 1 : 0;
      return { ...event, score: interestScore + branchScore + featuredScore };
    })
    .filter((event) => event.score > 0)
    .sort((a, b) => b.score - a.score);
};

export const getDeadlineCountdown = (deadline) => {
  const now = new Date();
  const timeLeft = new Date(deadline) - now;

  if (timeLeft <= 0) {
    return "Deadline closed";
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

  return `${days}d ${hours}h left`;
};

export const groupEventsByDate = (events) =>
  events.reduce((accumulator, event) => {
    if (!accumulator[event.date]) {
      accumulator[event.date] = [];
    }
    accumulator[event.date].push(event);
    return accumulator;
  }, {});
