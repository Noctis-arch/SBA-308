console.log("JavaScript Fundamentals");

// Course info
const course = {
  id: 451,
  name: "JavaScript Fundamentals"
};

const assignmentGroup = {
  id: 12345,
  name: "Fundamentals Assignments",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare Variables",
      due_at: "2026-05-10",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write Functions",
      due_at: "2026-05-15",
      points_possible: 150
    },
    {
      id: 3,
      name: "Loops Practice",
      due_at: "2026-05-19",
      points_possible: 100
    }
  ]
};

const learnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2026-05-09",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2026-05-15",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2026-05-21",
      score: 80
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2026-05-10",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2026-05-18",
      score: 140
    }
  }
];

function getLearnerData(course, assignmentGroup, learnerSubmissions) {

  try {

    if (course.id !== assignmentGroup.course_id) {
      throw new Error("Course IDs do not match.");
    }

    let results = [];

    let learners = [];

    for (let submission of learnerSubmissions) {

      if (!learners.includes(submission.learner_id)) {
        learners.push(submission.learner_id);
      }
    }

    for (let learnerId of learners) {

      let totalScore = 0;
      let totalPoints = 0;

      let assignmentScores = {};

      for (let submission of learnerSubmissions) {

        if (submission.learner_id !== learnerId) {
          continue;
        }

        let assignment = null;

        for (let a of assignmentGroup.assignments) {

          if (a.id === submission.assignment_id) {
            assignment = a;
          }
        }

        if (assignment === null) {
          console.warn("Assignment not found.");
          continue;
        }

        if (assignment.points_possible === 0) {
          console.warn("Points possible is invalid.");
          continue;
        }

        let score = submission.submission.score;

        let submittedDate = new Date(submission.submission.submitted_at);
        let dueDate = new Date(assignment.due_at);

        // check for late submission
        if (submittedDate > dueDate) {
          score = score - (assignment.points_possible * 0.1);
        }

        if (score < 0) {
          score = 0;
        }

        let average = score / assignment.points_possible;

        assignmentScores[assignment.id] = average;

        totalScore += score;
        totalPoints += assignment.points_possible;
      }

      // calculate final average
      let learner = {
        id: learnerId,
        avg: totalScore / totalPoints
      };

      for (let key in assignmentScores) {
        learner[key] = assignmentScores[key];
      }

      results.push(learner);
    }

    return results;

  } catch (error) {

    console.log(error.message);

  }
}

const result = getLearnerData(
  course,
  assignmentGroup,
  learnerSubmissions
);

console.log(result);