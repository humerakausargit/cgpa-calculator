/**
 * Academic CGPA & SGPA Evaluation System - Desktop Application Script
 * Architecture: Desktop-Only Fixed Layout Matrix
 */

(function () {
  'use strict';

  // 1. Grade Scale Definitions
  const GRADE_SCALES = {
    '10': [
      { grade: 'O', points: 10.0, label: 'Outstanding', marks: '90% - 100%' },
      { grade: 'A+', points: 9.0, label: 'Excellent', marks: '80% - 89%' },
      { grade: 'A', points: 8.0, label: 'Very Good', marks: '70% - 79%' },
      { grade: 'B+', points: 7.0, label: 'Good', marks: '60% - 69%' },
      { grade: 'B', points: 6.0, label: 'Above Average', marks: '55% - 59%' },
      { grade: 'C', points: 5.0, label: 'Average', marks: '50% - 54%' },
      { grade: 'P', points: 4.0, label: 'Pass', marks: '40% - 49%' },
      { grade: 'F', points: 0.0, label: 'Fail / Arrear', marks: 'Below 40%' }
    ],
    '4': [
      { grade: 'A+', points: 4.0, label: 'High Distinction', marks: '97% - 100%' },
      { grade: 'A', points: 4.0, label: 'Excellent', marks: '93% - 96%' },
      { grade: 'A-', points: 3.7, label: 'Very Good', marks: '90% - 92%' },
      { grade: 'B+', points: 3.3, label: 'Good', marks: '87% - 89%' },
      { grade: 'B', points: 3.0, label: 'Above Average', marks: '83% - 86%' },
      { grade: 'B-', points: 2.7, label: 'Satisfactory', marks: '80% - 82%' },
      { grade: 'C+', points: 2.3, label: 'Fair', marks: '77% - 79%' },
      { grade: 'C', points: 2.0, label: 'Average', marks: '73% - 76%' },
      { grade: 'C-', points: 1.7, label: 'Marginal', marks: '70% - 72%' },
      { grade: 'D+', points: 1.3, label: 'Low Pass', marks: '67% - 69%' },
      { grade: 'D', points: 1.0, label: 'Minimum Pass', marks: '60% - 66%' },
      { grade: 'F', points: 0.0, label: 'Failure', marks: 'Below 60%' }
    ]
  };

  // 2. Application State
  let currentScale = '10';
  let nextSemNumber = 2;
  let semesters = [];

  function createCourse(code = '', credits = 3.0, grade = 'A+') {
    return {
      id: 'crs_' + Math.random().toString(36).substring(2, 9),
      code: code,
      credits: credits,
      grade: grade
    };
  }

  function createSemester(title = 'Semester 1', coursesCount = 4) {
    const defaultGrade = currentScale === '10' ? 'A+' : 'A';
    const courses = [];
    for (let i = 0; i < coursesCount; i++) {
      courses.push(createCourse('', 3.0, defaultGrade));
    }
    return {
      id: 'sem_' + Math.random().toString(36).substring(2, 9),
      name: title,
      courses: courses
    };
  }

  function getGradePoints(gradeSymbol) {
    const list = GRADE_SCALES[currentScale] || [];
    const match = list.find(item => item.grade === gradeSymbol);
    return match ? match.points : 0.0;
  }

  // Sample Academic Records
  function getSampleData(scale) {
    if (scale === '10') {
      return [
        {
          id: 'sem_sample_1',
          name: 'Semester 1',
          courses: [
            { id: 'c1', code: 'CS101 - Engineering Mathematics I', credits: 4, grade: 'O' },
            { id: 'c2', code: 'CS102 - Computer Programming & C', credits: 4, grade: 'A+' },
            { id: 'c3', code: 'CS103 - Basic Electrical Engineering', credits: 3, grade: 'A' },
            { id: 'c4', code: 'CS104 - Engineering Physics & Lab', credits: 4, grade: 'A+' },
            { id: 'c5', code: 'CS105 - Technical English Communication', credits: 2, grade: 'O' }
          ]
        },
        {
          id: 'sem_sample_2',
          name: 'Semester 2',
          courses: [
            { id: 'c6', code: 'CS201 - Discrete Mathematical Structures', credits: 4, grade: 'A+' },
            { id: 'c7', code: 'CS202 - Data Structures & Algorithms', credits: 4, grade: 'O' },
            { id: 'c8', code: 'CS203 - Digital Logic & Computer Org', credits: 3, grade: 'A' },
            { id: 'c9', code: 'CS204 - Object Oriented Programming Java', credits: 4, grade: 'A+' },
            { id: 'c10', code: 'CS205 - Environmental Science', credits: 2, grade: 'A' }
          ]
        },
        {
          id: 'sem_sample_3',
          name: 'Semester 3',
          courses: [
            { id: 'c11', code: 'CS301 - Design & Analysis of Algorithms', credits: 4, grade: 'O' },
            { id: 'c12', code: 'CS302 - Database Management Systems', credits: 4, grade: 'A+' },
            { id: 'c13', code: 'CS303 - Operating Systems Concepts', credits: 3, grade: 'A+' },
            { id: 'c14', code: 'CS304 - Computer Networks & Protocols', credits: 4, grade: 'A' }
          ]
        }
      ];
    } else {
      return [
        {
          id: 'sem_sample_1',
          name: 'Semester 1 (Fall)',
          courses: [
            { id: 'c1', code: 'MATH 141 - Calculus I', credits: 4, grade: 'A' },
            { id: 'c2', code: 'CS 110 - Intro to Computer Science', credits: 4, grade: 'A+' },
            { id: 'c3', code: 'PHYS 150 - University Physics I', credits: 4, grade: 'B+' },
            { id: 'c4', code: 'ENG 101 - College Composition', credits: 3, grade: 'A-' }
          ]
        },
        {
          id: 'sem_sample_2',
          name: 'Semester 2 (Spring)',
          courses: [
            { id: 'c5', code: 'MATH 142 - Calculus II', credits: 4, grade: 'A-' },
            { id: 'c6', code: 'CS 210 - Data Structures', credits: 4, grade: 'A' },
            { id: 'c7', code: 'CS 220 - Computer Architecture', credits: 3, grade: 'B+' },
            { id: 'c8', code: 'COMM 120 - Public Speaking', credits: 3, grade: 'A' }
          ]
        }
      ];
    }
  }

  // 3. DOM Elements
  const scaleSelect = document.getElementById('grading-scale');
  const semestersListContainer = document.getElementById('semesters-list');
  const semesterCountTag = document.getElementById('semester-count-tag');
  const btnAddSemester = document.getElementById('btn-add-semester');
  const btnAddSemesterBottom = document.getElementById('btn-add-semester-bottom');
  const btnCalculate = document.getElementById('btn-calculate');
  const btnReset = document.getElementById('btn-reset');
  const btnSampleData = document.getElementById('btn-sample-data');
  const btnExportCsv = document.getElementById('btn-export-csv');
  const btnPrint = document.getElementById('btn-print');

  const kpiCgpa = document.getElementById('kpi-cgpa');
  const kpiScaleLabel = document.getElementById('kpi-scale-label');
  const kpiCredits = document.getElementById('kpi-credits');
  const kpiSemestersCount = document.getElementById('kpi-semesters-count');
  const kpiPoints = document.getElementById('kpi-points');
  const kpiPercentage = document.getElementById('kpi-percentage');
  const kpiPercentageFormula = document.getElementById('kpi-percentage-formula');
  const kpiStanding = document.getElementById('kpi-standing');
  const kpiHonorSub = document.getElementById('kpi-honor-sub');
  const breakdownTbody = document.getElementById('breakdown-tbody');
  const legendTbody = document.getElementById('legend-tbody');
  const formulaPercentageDesc = document.getElementById('formula-percentage-desc');

  // 4. Render Scale Legend Reference Table
  function renderLegendTable() {
    const list = GRADE_SCALES[currentScale] || [];
    legendTbody.innerHTML = '';
    list.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.grade}</strong></td>
        <td style="text-align: right; font-weight: 600;">${item.points.toFixed(currentScale === '4' ? 2 : 1)}</td>
        <td>${item.label}</td>
        <td>${item.marks}</td>
      `;
      legendTbody.appendChild(tr);
    });

    if (currentScale === '10') {
      formulaPercentageDesc.innerHTML = '10.0 Scale: Percentage (%) = CGPA &times; 9.5 (AICTE/UGC standard formula)';
      kpiPercentageFormula.textContent = 'Formula: CGPA \u00D7 9.5';
      kpiScaleLabel.textContent = 'Out of 10.00 max points';
    } else {
      formulaPercentageDesc.innerHTML = '4.0 Scale: Percentage (%) = (CGPA / 4.0) &times; 100';
      kpiPercentageFormula.textContent = 'Formula: (CGPA / 4.0) \u00D7 100';
      kpiScaleLabel.textContent = 'Out of 4.00 max points';
    }
  }

  // 5. Render Semester Panels
  function renderSemesters() {
    semestersListContainer.innerHTML = '';
    const scaleList = GRADE_SCALES[currentScale] || [];

    semesters.forEach((sem, sIndex) => {
      const card = document.createElement('div');
      card.className = 'semester-card';
      card.setAttribute('data-sem-id', sem.id);

      // Card Header
      const header = document.createElement('div');
      header.className = 'semester-card-header';
      header.innerHTML = `
        <div class="semester-title-box">
          <input type="text" class="semester-name-input" value="${escapeHtml(sem.name)}" data-action="rename-sem" title="Click to rename semester">
          <span class="semester-sgpa-pill">SGPA: <strong id="sgpa-pill-${sem.id}">0.00</strong></span>
        </div>
        <div class="semester-header-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-action="add-course">+ Add Course</button>
          ${semesters.length > 1 ? `<button type="button" class="btn btn-danger-outline btn-sm" data-action="remove-sem" title="Delete this entire semester">Delete Semester</button>` : ''}
        </div>
      `;
      card.appendChild(header);

      // Desktop Table
      const table = document.createElement('table');
      table.className = 'desktop-table';
      table.innerHTML = `
        <thead>
          <tr>
            <th style="width: 36px; text-align: center;">#</th>
            <th style="width: 340px;">Course Code & Subject Title</th>
            <th style="width: 100px; text-align: right;">Credits</th>
            <th style="width: 150px;">Grade</th>
            <th style="width: 105px; text-align: right;">Grade Points</th>
            <th style="width: 120px; text-align: right;">Quality Points</th>
            <th style="width: 44px; text-align: center;">Action</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="text-align: right;">Semester Summary:</td>
            <td id="sem-credits-${sem.id}" style="text-align: right; font-weight: 700;">0.0</td>
            <td></td>
            <td></td>
            <td id="sem-points-${sem.id}" style="text-align: right; font-weight: 700;">0.00</td>
            <td></td>
          </tr>
        </tfoot>
      `;

      const tbody = table.querySelector('tbody');

      sem.courses.forEach((course, cIndex) => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-course-id', course.id);

        const gradePoints = getGradePoints(course.grade);
        const qualityPoints = (Number(course.credits) || 0) * gradePoints;

        // Build Grade Dropdown Options
        let gradeOptions = '';
        scaleList.forEach(opt => {
          const selected = opt.grade === course.grade ? 'selected' : '';
          gradeOptions += `<option value="${opt.grade}" ${selected}>${opt.grade} (${opt.points.toFixed(currentScale === '4' ? 2 : 1)} pts)</option>`;
        });

        tr.innerHTML = `
          <td class="text-center" style="color: #64748b; font-weight: 600;">${cIndex + 1}</td>
          <td>
            <input type="text" class="input-desktop input-text" value="${escapeHtml(course.code)}" placeholder="e.g. CS101 - Algorithms" data-action="edit-code">
          </td>
          <td>
            <input type="number" step="0.5" min="0" max="20" class="input-desktop input-number" value="${course.credits}" data-action="edit-credits">
          </td>
          <td>
            <select class="select-desktop" style="width: 100%;" data-action="edit-grade">
              ${gradeOptions}
            </select>
          </td>
          <td class="text-right readonly-stat" data-role="gp-val">
            ${gradePoints.toFixed(currentScale === '4' ? 2 : 1)}
          </td>
          <td class="text-right readonly-stat" data-role="qp-val">
            ${qualityPoints.toFixed(2)}
          </td>
          <td class="text-center">
            ${sem.courses.length > 1 ? `<button type="button" class="btn-icon-danger" data-action="remove-course" title="Remove course row">&times;</button>` : ''}
          </td>
        `;

        tbody.appendChild(tr);
      });

      card.appendChild(table);

      // Card bottom toolbar
      const bottomToolbar = document.createElement('div');
      bottomToolbar.className = 'semester-table-toolbar';
      bottomToolbar.innerHTML = `
        <span style="font-size: 11px; color: #64748b;">${sem.courses.length} courses registered in this semester</span>
        <button type="button" class="btn btn-secondary btn-sm" data-action="add-course">+ Add Course</button>
      `;
      card.appendChild(bottomToolbar);

      semestersListContainer.appendChild(card);
    });

    semesterCountTag.textContent = `${semesters.length} Semester${semesters.length > 1 ? 's' : ''} Active`;
    kpiSemestersCount.textContent = `Across ${semesters.length} Semester${semesters.length > 1 ? 's' : ''}`;
  }

  // 6. Calculate CGPA & SGPA Engine
  function calculateCGPA() {
    let grandTotalCredits = 0;
    let grandTotalPoints = 0;
    let totalCoursesCount = 0;

    const breakdownData = [];
    let runningCumulativeCredits = 0;
    let runningCumulativePoints = 0;

    semesters.forEach(sem => {
      let semCredits = 0;
      let semPoints = 0;

      sem.courses.forEach(course => {
        const cred = parseFloat(course.credits) || 0;
        const gp = getGradePoints(course.grade);
        const qp = cred * gp;

        semCredits += cred;
        semPoints += qp;
        totalCoursesCount++;
      });

      const sgpa = semCredits > 0 ? (semPoints / semCredits) : 0;

      // Update semester card footer & pill
      const sgpaPill = document.getElementById(`sgpa-pill-${sem.id}`);
      if (sgpaPill) {
        sgpaPill.textContent = sgpa.toFixed(2);
      }
      const semCreditsCell = document.getElementById(`sem-credits-${sem.id}`);
      if (semCreditsCell) {
        semCreditsCell.textContent = semCredits.toFixed(1);
      }
      const semPointsCell = document.getElementById(`sem-points-${sem.id}`);
      if (semPointsCell) {
        semPointsCell.textContent = semPoints.toFixed(2);
      }

      grandTotalCredits += semCredits;
      grandTotalPoints += semPoints;

      runningCumulativeCredits += semCredits;
      runningCumulativePoints += semPoints;
      const runningCgpa = runningCumulativeCredits > 0 ? (runningCumulativePoints / runningCumulativeCredits) : 0;

      // Performance classification for semester
      let semStatus = 'Passed';
      let semStatusClass = 'status-pass';
      if (currentScale === '10') {
        if (sgpa < 4.0 && semCredits > 0) {
          semStatus = 'Backlog / Arrear';
          semStatusClass = 'status-fail';
        } else if (sgpa >= 8.5) {
          semStatus = 'Distinction';
          semStatusClass = 'status-pass';
        } else if (sgpa >= 6.75) {
          semStatus = 'First Class';
          semStatusClass = 'status-pass';
        } else {
          semStatus = 'Satisfactory';
          semStatusClass = 'status-warn';
        }
      } else {
        if (sgpa < 2.0 && semCredits > 0) {
          semStatus = 'Probation';
          semStatusClass = 'status-fail';
        } else if (sgpa >= 3.8) {
          semStatus = 'Dean\'s List';
          semStatusClass = 'status-pass';
        } else if (sgpa >= 3.0) {
          semStatus = 'Good Standing';
          semStatusClass = 'status-pass';
        } else {
          semStatus = 'Satisfactory';
          semStatusClass = 'status-warn';
        }
      }

      breakdownData.push({
        name: sem.name,
        courses: sem.courses.length,
        credits: semCredits,
        points: semPoints,
        sgpa: sgpa,
        cumCredits: runningCumulativeCredits,
        cumCgpa: runningCgpa,
        status: semStatus,
        statusClass: semStatusClass
      });
    });

    const finalCGPA = grandTotalCredits > 0 ? (grandTotalPoints / grandTotalCredits) : 0;

    // Estimated Percentage Formula
    let percentage = 0;
    if (currentScale === '10') {
      percentage = finalCGPA * 9.5;
    } else {
      percentage = (finalCGPA / 4.0) * 100;
    }
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    // Overall Degree Standing Classification
    let standing = 'Pending Data';
    let standingColor = '#64748b';
    let honorSub = 'Minimum credits required';

    if (grandTotalCredits > 0) {
      if (currentScale === '10') {
        if (finalCGPA >= 8.5) {
          standing = 'First Class with Distinction';
          standingColor = '#15803d';
          honorSub = 'Exemplary Academic Excellence';
        } else if (finalCGPA >= 6.75) {
          standing = 'First Class';
          standingColor = '#1d4ed8';
          honorSub = 'High Academic Performance';
        } else if (finalCGPA >= 5.75) {
          standing = 'Second Class';
          standingColor = '#d97706';
          honorSub = 'Above Average Standing';
        } else if (finalCGPA >= 4.0) {
          standing = 'Pass Class';
          standingColor = '#475569';
          honorSub = 'Degree Requirements Met';
        } else {
          standing = 'Fail / Backlogs';
          standingColor = '#dc2626';
          honorSub = 'Course Repeat / Arrears Pending';
        }
      } else {
        if (finalCGPA >= 3.8) {
          standing = 'Summa Cum Laude (High Honors)';
          standingColor = '#15803d';
          honorSub = 'Highest Academic Distinction';
        } else if (finalCGPA >= 3.5) {
          standing = 'Magna Cum Laude';
          standingColor = '#1d4ed8';
          honorSub = 'High Academic Honors';
        } else if (finalCGPA >= 3.0) {
          standing = 'Cum Laude (Honors)';
          standingColor = '#2563eb';
          honorSub = 'Dean\'s Honor Roll';
        } else if (finalCGPA >= 2.0) {
          standing = 'Good Standing';
          standingColor = '#475569';
          honorSub = 'Satisfactory Academic Standing';
        } else {
          standing = 'Academic Probation';
          standingColor = '#dc2626';
          honorSub = 'Below Minimum Graduation Standard';
        }
      }
    }

    // Render KPI Card Values
    kpiCgpa.textContent = finalCGPA.toFixed(2);
    kpiCredits.textContent = grandTotalCredits.toFixed(1);
    kpiPoints.textContent = grandTotalPoints.toFixed(2);
    kpiPercentage.textContent = percentage.toFixed(2) + '%';
    kpiStanding.textContent = standing;
    kpiStanding.style.color = standingColor;
    kpiHonorSub.textContent = honorSub;

    // Render Breakdown Desktop Table
    breakdownTbody.innerHTML = '';
    breakdownData.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600;">${escapeHtml(row.name)}</td>
        <td style="text-align: center;">${row.courses}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums;">${row.credits.toFixed(1)}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums;">${row.points.toFixed(2)}</td>
        <td style="text-align: right; font-weight: 700; color: #2563eb; font-variant-numeric: tabular-nums;">${row.sgpa.toFixed(2)}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums;">${row.cumCredits.toFixed(1)}</td>
        <td style="text-align: right; font-weight: 700; color: #0f172a; font-variant-numeric: tabular-nums;">${row.cumCgpa.toFixed(2)}</td>
        <td><span class="status-badge ${row.statusClass}">${row.status}</span></td>
      `;
      breakdownTbody.appendChild(tr);
    });
  }

  // 7. Interactive Event Handlers
  function setupEventDelegation() {
    semestersListContainer.addEventListener('input', function (e) {
      const target = e.target;
      const semCard = target.closest('.semester-card');
      if (!semCard) return;
      const semId = semCard.getAttribute('data-sem-id');
      const semester = semesters.find(s => s.id === semId);
      if (!semester) return;

      const action = target.getAttribute('data-action');

      if (action === 'rename-sem') {
        semester.name = target.value.trim() || 'Untitled Semester';
        calculateCGPA();
        return;
      }

      const tr = target.closest('tr');
      if (!tr) return;
      const courseId = tr.getAttribute('data-course-id');
      const course = semester.courses.find(c => c.id === courseId);
      if (!course) return;

      if (action === 'edit-code') {
        course.code = target.value;
      } else if (action === 'edit-credits') {
        let val = parseFloat(target.value);
        if (isNaN(val) || val < 0) val = 0;
        course.credits = val;

        // update tr quality points
        const gp = getGradePoints(course.grade);
        const qp = course.credits * gp;
        const qpCell = tr.querySelector('[data-role="qp-val"]');
        if (qpCell) qpCell.textContent = qp.toFixed(2);

        calculateCGPA();
      }
    });

    semestersListContainer.addEventListener('change', function (e) {
      const target = e.target;
      const semCard = target.closest('.semester-card');
      if (!semCard) return;
      const semId = semCard.getAttribute('data-sem-id');
      const semester = semesters.find(s => s.id === semId);
      if (!semester) return;

      const action = target.getAttribute('data-action');
      const tr = target.closest('tr');
      if (!tr) return;
      const courseId = tr.getAttribute('data-course-id');
      const course = semester.courses.find(c => c.id === courseId);
      if (!course) return;

      if (action === 'edit-grade') {
        course.grade = target.value;
        const gp = getGradePoints(course.grade);
        const qp = (Number(course.credits) || 0) * gp;

        const gpCell = tr.querySelector('[data-role="gp-val"]');
        if (gpCell) gpCell.textContent = gp.toFixed(currentScale === '4' ? 2 : 1);

        const qpCell = tr.querySelector('[data-role="qp-val"]');
        if (qpCell) qpCell.textContent = qp.toFixed(2);

        calculateCGPA();
      }
    });

    semestersListContainer.addEventListener('click', function (e) {
      const button = e.target.closest('button');
      if (!button) return;

      const semCard = button.closest('.semester-card');
      if (!semCard) return;
      const semId = semCard.getAttribute('data-sem-id');
      const semester = semesters.find(s => s.id === semId);
      if (!semester) return;

      const action = button.getAttribute('data-action');

      if (action === 'add-course') {
        const defaultGrade = currentScale === '10' ? 'A+' : 'A';
        semester.courses.push(createCourse('', 3.0, defaultGrade));
        renderSemesters();
        calculateCGPA();
      } else if (action === 'remove-course') {
        const tr = button.closest('tr');
        if (!tr) return;
        const courseId = tr.getAttribute('data-course-id');
        semester.courses = semester.courses.filter(c => c.id !== courseId);
        renderSemesters();
        calculateCGPA();
      } else if (action === 'remove-sem') {
        if (semesters.length > 1) {
          semesters = semesters.filter(s => s.id !== semId);
          renderSemesters();
          calculateCGPA();
        }
      }
    });
  }

  // 8. Scale Change Handler
  scaleSelect.addEventListener('change', function () {
    currentScale = this.value;
    const defaultGrade = currentScale === '10' ? 'A+' : 'A';

    // Normalize course grades if invalid for new scale
    semesters.forEach(sem => {
      sem.courses.forEach(c => {
        const valid = GRADE_SCALES[currentScale].some(g => g.grade === c.grade);
        if (!valid) {
          c.grade = defaultGrade;
        }
      });
    });

    renderLegendTable();
    renderSemesters();
    calculateCGPA();
  });

  // 9. Add Semester Handlers
  function addNewSemester() {
    const semName = `Semester ${nextSemNumber++}`;
    semesters.push(createSemester(semName, 4));
    renderSemesters();
    calculateCGPA();
    // Scroll smoothly to bottom of semesters
    btnAddSemesterBottom.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  btnAddSemester.addEventListener('click', addNewSemester);
  btnAddSemesterBottom.addEventListener('click', addNewSemester);

  // 10. DIRECTLY ADJACENT Primary Action Handlers: Calculate & Reset
  btnCalculate.addEventListener('click', function () {
    calculateCGPA();
    // Visual feedback
    btnCalculate.textContent = 'Calculated!';
    setTimeout(() => {
      btnCalculate.textContent = 'Calculate CGPA';
    }, 900);
  });

  btnReset.addEventListener('click', function () {
    if (confirm('Reset all semester courses back to the initial blank template?')) {
      nextSemNumber = 2;
      semesters = [createSemester('Semester 1', 4)];
      renderSemesters();
      calculateCGPA();
    }
  });

  // 11. Sample Academic Records
  btnSampleData.addEventListener('click', function () {
    semesters = getSampleData(currentScale);
    nextSemNumber = semesters.length + 1;
    renderSemesters();
    calculateCGPA();
  });

  // 12. CSV Export Engine
  btnExportCsv.addEventListener('click', function () {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Semester,Course Code,Credits,Grade,Grade Points,Quality Points\r\n';

    semesters.forEach(sem => {
      sem.courses.forEach(c => {
        const gp = getGradePoints(c.grade);
        const qp = (Number(c.credits) || 0) * gp;
        const cleanName = `"${(c.code || 'Unspecified Course').replace(/"/g, '""')}"`;
        const semClean = `"${sem.name.replace(/"/g, '""')}"`;
        csvContent += `${semClean},${cleanName},${c.credits},${c.grade},${gp.toFixed(2)},${qp.toFixed(2)}\r\n`;
      });
    });

    csvContent += '\r\nSummary Statistics\r\n';
    csvContent += `Grading Scale,${currentScale}.0 Scale\r\n`;
    csvContent += `Cumulative CGPA,${kpiCgpa.textContent}\r\n`;
    csvContent += `Total Completed Credits,${kpiCredits.textContent}\r\n`;
    csvContent += `Total Quality Points,${kpiPoints.textContent}\r\n`;
    csvContent += `Academic Standing,"${kpiStanding.textContent}"\r\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'academic_cgpa_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // 13. Print Sheet Trigger
  btnPrint.addEventListener('click', function () {
    window.print();
  });

  // Helper Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 14. Initialization
  function init() {
    renderLegendTable();
    // Default initial state: 1 semester with 5 course rows
    semesters = [createSemester('Semester 1', 5)];
    renderSemesters();
    setupEventDelegation();
    calculateCGPA();
  }

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
