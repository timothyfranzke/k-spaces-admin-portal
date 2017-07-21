(function ()
{
  'use strict';

  angular
    .module('app.manager')
    .controller('SpaceDetailController', SpaceDetailController);

  /** @ngInject */
  function SpaceDetailController($state, Locations, Space, StudentUsers, FacultyUsers, managerService, avatarGeneratorService)
  {
    console.log("space detail controller");
    var vm = this;

    // Data
    vm.space = Space;
    vm.locations = Locations;
    vm.studentUsers = StudentUsers;
    vm.facultyUsers = FacultyUsers;
    vm.spaceFaculty = [];
    vm.spaceStudents = [];
    vm.selectedFaculty = null;
    vm.selectedStudent = null;
    var updatedFacultyUsers = [];
    var updatedStudentUsers = [];

    StudentUsers.forEach(function(student){
      if(student.space_id === Space._id && Space._id !== undefined){
        vm.spaceStudents.push(student);
      }
    });
    FacultyUsers.forEach(function(faculty){
      if(faculty.space_id === Space._id){
        vm.spaceFaculty.push(faculty);
      }
    });

    /*vm.dtInstance = {};
    vm.dtOptions = {
      dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      columnDefs  : [
        {
          // Target the id column
          targets: 0,
          width  : '72px'
        },
        {
          // Target the image column
          targets   : 1,
          filterable: true,
          sortable  : true
        },
        {
          // Target the image column
          targets   : 2,
          filterable: true,
          sortable  : true,
          width     : '150px'
        },
        {
          // Target the actions column
          targets           : 2,
          responsivePriority: 1,
          filterable        : true,
          sortable          : false
        }
      ],
      pagingType  : 'simple',
      lengthMenu  : [10, 20, 30, 50, 100],
      pageLength  : 20,
      scrollY     : 'auto',
      responsive  : true
    };*/
    // Methods
    /*    vm.gotoLocations = gotoLocations();
     vm.gotoSpacesDetail = gotoSpacesDetail;*/
    //vm.updateLocation = updateLocation;
    vm.saveSpace = saveSpace;
    vm.createAvatar = createAvatar;
    vm.gotoSpaces = gotoSpaces;
    vm.selectFaculty = selectFaculty;
    vm.selectStudent = selectStudent;

    //////////
    /**
     * Go to orders page
     */
    function gotoSpaces()
    {
      $state.go('app.manager.spaces');
    }

    /**
     * Go to product page
     * @param id
     */
    function gotoSpacesDetail(id)
    {
      $state.go('app.manager.spaces.detail', {id: id});
    }

    /**
     * Save product
     */
    function saveSpace()
    {
      // Since we have two-way binding in place, we don't really need
      // this function to update the locations array in the demo.
      // But in real world, you would need this function to trigger
      // an API call to update your database.
      if ( vm.location._id )
      {
        managerService.updateSpace(vm.space._id, vm.space);
      }
      else
      {
        managerService.createSpace(vm.space, vm.image);
      }

    }

    /**
     * Checks if the given form valid
     *
     * @param formName
     */
    function isFormValid(formName)
    {
      if ( $scope[formName] && $scope[formName].$valid )
      {
        return $scope[formName].$valid;
      }
    }

    function createAvatar(){
      avatarGeneratorService.avatarGenerator(function(image){
        vm.space.hasImage = true;
        avatarGeneratorService.resizeImage(image)
          .then(function(res){
            vm.image = res;
          })
      })
    }

    function selectFaculty(faculty){
      console.log("selected faculty");
      console.log(faculty);
      vm.spaceFaculty.push(faculty);
      vm.space.faculty.push(faculty._id);

      console.log(vm.spaceFaculty.length);
    }

    function selectStudent(student){
      vm.spaceStudents.push(student);
      vm.space.students.push(student._id);
    }
  }
})();
