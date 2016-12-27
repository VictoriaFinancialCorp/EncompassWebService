//https://bootstrap-datepicker.readthedocs.io/en/latest/

  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startView: 1,
    maxViewMode: 2,
    todayBtn: "linked",
    clearBtn: true,
    daysOfWeekHighlighted: "1,2,3,4,5",
    autoclose: true,
    toggleActive: true
  });
