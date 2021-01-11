import { of } from 'rxjs';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let fixture: TasksComponent;
  let taskStoreServiceMock;
  let taskQueryMock;

  beforeEach(() => {
    taskStoreServiceMock = {
      get: jest.fn()
    }

    taskQueryMock = {
      selectAll: jest.fn()
    }

    fixture = new TasksComponent(
      taskStoreServiceMock,
      taskQueryMock
    )
  });

  describe('Setup Component', () => {
    describe('ngOnInit', () => {
      it('Should call getAllTasks and getActiveTasks and getCompletedTasks', () => {

        const getAllTasksSpy = jest.spyOn(fixture, 'getAllTasks');
        const getActiveTasksSpy = jest.spyOn(fixture, 'getActiveTasks');
        const getCompletedTasksSpy = jest.spyOn(fixture, 'getCompletedTasks');

        taskStoreServiceMock.get.mockReturnValue(of(true));
        fixture.allTasksStore$ = taskQueryMock.selectAll.mockReturnValue(of(true));

        fixture.ngOnInit();

        expect(getAllTasksSpy).toBeCalled();
        expect(getActiveTasksSpy).toBeCalled();
        expect(getCompletedTasksSpy).toBeCalled();

      });
    }); // Emd Descrobe ngOnInit
  }); // End Describe Setup Component

}); // End Describre TasksComponent







// describe('TasksComponent', () => {
//   let component: TasksComponent;
//   let fixture: ComponentFixture<TasksComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [TasksComponent]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TasksComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {

//     expect(fixture).toBeTruthy();
//   });
// });
