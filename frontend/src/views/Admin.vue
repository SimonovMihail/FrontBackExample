<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Страница администратора</h1>
        <div class="content-container">
          <div class="team-list-container">
            <h3 class="team-list-container__name">Список команд</h3>
            <div>
              <el-scrollbar class="scrollbar-content" height="400px">
                <p class="team-item team-item__1"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__2"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__3"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__4"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__5"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__6"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__7"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__8"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__9"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__10"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
          </div>

          <div class="user-list-container">
            <h3 class="user-list-container__name">Список пользователей</h3>
            <div>
              <el-form
                  :model="userRolesFormModel"
                  ref="userRolesFormRef"
                  class="user-roles-form"
                  @submit.prevent="saveUserRoles"
              >
                <el-scrollbar class="scrollbar-content" height="400px">
                  <p class="user-item user-item__1"><span>Иванов Иван Иванович</span>
                    <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                    <el-form-item class="roles1_value" prop="roles1_value"> <!-- Это выпадающее меню -->
                      <el-select
                          v-model="userRolesFormModel.roles1_value"
                          placeholder="Выбор роли"
                          size="medium"
                          class="roles1_value__select"
                          style="width: 120px"
                      > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                        <el-option
                            v-for="role1 in roles1"
                            :key="role1.roles1_value"
                            :label="role1.roles1_value"
                            :value="role1.roles1_value"
                        />
                      </el-select>
                    </el-form-item>
                  </p>
                  <p class="user-item user-item__2"><span>Тамарова Тамара Тамаровна</span>
                    <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                    <el-form-item class="roles2_value" prop="roles2_value"> <!-- Это выпадающее меню -->
                      <el-select
                          v-model="userRolesFormModel.roles2_value"
                          placeholder="Выбор роли"
                          size="medium"
                          class="roles2_value__select"
                          style="width: 120px"
                      > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                        <el-option
                            v-for="role2 in roles2"
                            :key="role2.roles2_value"
                            :label="role2.roles2_value"
                            :value="role2.roles2_value"
                        />
                      </el-select>
                    </el-form-item>
                  </p>
                </el-scrollbar>
              </el-form>
            </div>
            <div class="button-container-users">
              <el-button class="button-confirm-users" type="primary" @click="saveUserRoles">Сохранить роли</el-button>
              <el-button class="button-cancel-users" type="info" @click="cancelUserRoles">Отменить изменения</el-button>
            </div>
          </div>

          <div class="finished-projects-container">
            <h3 class="finished-projects-container__name">Список готовых работ</h3>
            <el-form
                :model="finishedProjectsGradesFormModel"
                ref="finishedProjectsGradesFormRef"
                class="finished-projects-grades-form"
                :rules="rules_grades"
                @submit.prevent="saveFinishedProjectsGrades"
            >
              <el-scrollbar class="scrollbar-content" height="400px">
                <p class="finished-project-item finished-project-item__1"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item"  prop="grade1">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade1"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__2"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade2">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade2"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__3"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade3">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade3"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__4"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade4">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade4"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__5"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade5">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade5"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__6"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade6">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade6"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__7"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade7">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade7"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__8"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade8">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade8"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__9"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade9">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade9"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__10"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade10">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade10"></el-input>
                  </el-form-item>
                </p>
              </el-scrollbar>
            </el-form>
            <div class="button-container-grades">
              <el-button class="button-confirm-grades" type="primary" @click="saveFinishedProjectsGrades">Сохранить оценки</el-button>
              <el-button class="button-cancel-grades" type="info" @click="cancelFinishedProjectsGrades">Отменить изменения</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay-darken-rest-of-the-content"></div>
    <!-- ДАЛЬШЕ ЗДЕСЬ МОДАЛЬНЫЕ ОКНА -->
    <div class="modal-overlay-team-info-container">
      <div class="modal-overlay-team-info-container__visible-content">
        <h1 class="main-container-name modal-overlay-team-info-container__container-name">Информация о команде</h1>
        <el-button type="primary" class="button-close-modal-team-info-window">
          <el-icon><Close/></el-icon>
        </el-button>
        <el-scrollbar class="scrollbar-content" height="400px">
          <el-form
              :model="teamInformationFormModel"
              :rules="rules_teams"
              ref="teamInformationFormRef"
              class="teamInformation-form"
              label-width="110px"
              @submit.prevent="saveTeamInformationChanges"
              label-position="left"
          >
            <!-- Сделал табуляцию этой вложенности подальше, т.к. работаю в вебшторме, потом табуляцию уменьшу... -->
            <!-- Помимо атрибута о ширине лейблов в форме, я так же индивидуально настроил эти ширины у некоторых элементов. -->

            <!-- Стараюсь давать нейминг по БЕМу, но могу где-то забывать про него. Нейминг контейнеров с контентом должен быть вида
                 xx-xx-...-info-container -->
            <div class="teamInformation-form__container team-lead-info-container">
              <h3 class="teamInformation-form-info-container-name">Лидер команды</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="team_lead_fio">
                <el-input class="input-team_lead_fio" v-model="teamInformationFormModel.team_lead_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="team_lead_email">
                <el-input class="input-team_lead_email" v-model="teamInformationFormModel.team_lead_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="team_lead_number">
                <el-input class="input-team_lead_number" v-model="teamInformationFormModel.team_lead_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <el-form-item label="ВУЗ:" label-width="90px" prop="team_lead_vuz">
                <el-input class="input-team_lead_vuz" v-model="teamInformationFormModel.team_lead_vuz" clearable></el-input>
              </el-form-item>
            </div>

            <div class="teamInformation-form__container team-lead-vuz-info-container">
              <h3 class="teamInformation-form-info-container-name">Направление/специальность и курс лидера</h3>
              <el-form-item label="Направление:" prop="team_lead_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
                <el-input class="input-team_lead_vuz_direction" v-model="teamInformationFormModel.team_lead_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
              </el-form-item>
              <el-form-item label="Код:" prop="team_lead_vuz_code">
                <el-input class="input-code" v-model="teamInformationFormModel.team_lead_vuz_code" clearable></el-input>
              </el-form-item>

              <el-form-item class="team_lead_value_courses" prop="team_lead_value_courses"> <!-- Это выпадающее меню -->
                <el-select
                    v-model="teamInformationFormModel.team_lead_value_courses"
                    placeholder="Выбор курса"
                    class="team_lead_value_courses__select"
                    size="large"
                    style="width: 240px"
                > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                  <el-option
                      v-for="team_lead_course in team_lead_courses"
                      :key="team_lead_course.team_lead_value_courses"
                      :label="team_lead_course.team_lead_value_courses"
                      :value="team_lead_course.team_lead_value_courses"
                  />
                </el-select>
              </el-form-item>
              <!-- Я не знаю, как настроить отправку файлов... -->
              <!-- Тему с отправкой файлов потом обсудим со старшаками и бекендом -->
              <el-form-item class="upload-files-button team_lead_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button team_lead_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button team_lead_consent" label="Согласие:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
            </div>

            <div class="teamInformation-form__container mentor-info-container">
              <h3 class="teamInformation-form-info-container-name">Наставник</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="mentor_fio">
                <el-input class="input-mentor_fio" v-model="teamInformationFormModel.mentor_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="mentor_email">
                <el-input class="input-mentor_email" v-model="teamInformationFormModel.mentor_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="mentor_number">
                <el-input class="input-mentor_number" v-model="teamInformationFormModel.mentor_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <!-- По наставникам тоже непонятно. По наброскам в тетради не упомянуто, что наставников будет несколько и их
                   нужно будет добавлять. Но слово "Наставники" я оставлю, потому что так написано. -->
            </div>

            <div class="teamInformation-form__container team-info-container">
              <h3 class="teamInformation-form-info-container-name">Команда</h3>
              <el-form-item label="Название:" label-width="90px" prop="team_name">
                <el-input class="input-team_name" v-model="teamInformationFormModel.team_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="Описание:" label-width="90px" prop="team_description">
                <el-input class="input-team_description" v-model="teamInformationFormModel.team_description" clearable></el-input>
              </el-form-item>
              <el-form-item class="team_logo" label="Лого:" label-width="90px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
            </div>

            <div class="teamInformation-form__container team-member-info-container">
              <h3 class="teamInformation-form-info-container-name">Участник 1</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="team_member_fio">
                <el-input class="input-team_member_fio" v-model="teamInformationFormModel.team_member_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="team_member_email">
                <el-input class="input-team_member_email" v-model="teamInformationFormModel.team_member_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="team_member_number">
                <el-input class="input-team_member_number" v-model="teamInformationFormModel.team_member_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <el-form-item class="team_member_add">
                <el-button class="team_member_add__button" type="info" @click="addMember">+ Добавить участника</el-button> <!-- Пока пустышка -->
              </el-form-item>
            </div>

            <div class="teamInformation-form__container team-member-vuz-info-container">
              <h3 class="teamInformation-form-info-container-name">Направление/специальность и курс участника</h3>
              <el-form-item label="Направление:" prop="team_member_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
                <el-input class="input-team_member_vuz_direction" v-model="teamInformationFormModel.team_member_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
              </el-form-item>
              <el-form-item label="Код:" prop="team_member_vuz_code">
                <el-input class="input-code" v-model="teamInformationFormModel.team_member_vuz_code" clearable></el-input>
              </el-form-item>

              <el-form-item class="team_member_value_courses" prop="team_member_value_courses"> <!-- Это выпадающее меню -->
                <el-select
                    v-model="teamInformationFormModel.team_member_value_courses"
                    placeholder="Выбор курса"
                    size="large"
                    class="team_member_value_courses__select"
                    style="width: 240px"
                > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                  <el-option
                      v-for="team_member_course in team_member_courses"
                      :key="team_member_course.team_member_value_courses"
                      :label="team_member_course.team_member_value_courses"
                      :value="team_member_course.team_member_value_courses"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="upload-files-button team_member_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button team_member_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button team_member_consent" label="Согласие:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </el-form>
        </el-scrollbar>
        <div class="modal-team-info-button-container">
          <el-button class="button-confirm-modal-team-info" type="primary" @click="saveTeamInformationChanges">Сохранить и закрыть</el-button>
          <el-button class="button-cancel-modal-team-info" type="info" @click="cancelTeamInformationChanges">Отменить изменения</el-button>
        </div>
      </div>
    </div>
    <div class="modal-overlay-user-info-container">
      <div class="modal-overlay-user-info-container__visible-content">
        <h1 class="main-container-name modal-overlay-user-info-container__container-name">Информация о пользователе</h1>
        <el-button type="primary" class="button-close-modal-user-info-window">
          <el-icon><Close/></el-icon>
        </el-button>
        <el-scrollbar class="scrollbar-content" height="400px">
          <el-form
              :model="userInformationFormModel"
              :rules="rules_users"
              ref="userInformationFormRef"
              class="userInformation-form"
              label-width="110px"
              @submit.prevent="saveUserInformationChanges"
              label-position="left"
          >
            <!-- Помимо атрибута о ширине лейблов в форме, я так же индивидуально настроил эти ширины у некоторых элементов. -->

            <!-- Стараюсь давать нейминг по БЕМу, но могу где-то забывать про него. Нейминг контейнеров с контентом должен быть вида
                 xx-xx-...-info-container -->
            <div class="userInformation-form__container team-lead-info-container">
              <h3 class="userInformation-form-info-container-name">Основные данные</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="user_info_fio">
                <el-input class="input-user_info_fio" v-model="userInformationFormModel.user_info_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="user_info_email">
                <el-input class="input-user_info_email" v-model="userInformationFormModel.user_info_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Пароль:" label-width="90px" prop="user_info_password">
                <el-input class="input-user_info_password" v-model="userInformationFormModel.user_info_password" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="user_info_number">
                <el-input class="input-user_info_number" v-model="userInformationFormModel.user_info_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <el-form-item label="ВУЗ:" label-width="90px" prop="user_info_vuz">
                <el-input class="input-user_info_vuz" v-model="userInformationFormModel.user_info_vuz" clearable></el-input>
              </el-form-item>
              <el-form-item class="upload-files-button user_info_pfp" label="Аватарка:" label-width="90px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
            </div>

            <div class="userInformation-form__container team-lead-vuz-info-container">
              <h3 class="userInformation-form-info-container-name">Направление/специальность и курс</h3>
              <el-form-item label="Направление:" prop="user_info_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
                <el-input class="input-user_info_vuz_direction" v-model="userInformationFormModel.user_info_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
              </el-form-item>
              <el-form-item label="Код:" prop="user_info_vuz_code">
                <el-input class="input-code" v-model="userInformationFormModel.user_info_vuz_code" clearable></el-input>
              </el-form-item>

              <el-form-item class="user_info_value_courses" prop="user_info_value_courses"> <!-- Это выпадающее меню -->
                <el-select
                    v-model="userInformationFormModel.user_info_value_courses"
                    placeholder="Выбор курса"
                    class="user_info_value_courses__select"
                    size="large"
                    style="width: 240px"
                > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                  <el-option
                      v-for="user_info_course in user_info_courses"
                      :key="user_info_course.user_info_value_courses"
                      :label="user_info_course.user_info_value_courses"
                      :value="user_info_course.user_info_value_courses"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="upload-files-button user_info_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button user_info_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button user_info_consent" label="Согласие:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </el-form>
        </el-scrollbar>
        <div class="modal-user-info-button-container">
          <el-button class="button-confirm-modal-user-info" type="primary" @click="saveUserInformationChanges">Сохранить и закрыть</el-button>
          <el-button class="button-cancel-modal-user-info" type="info" @click="cancelUserInformationChanges">Отменить изменения</el-button>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>


<script lang="ts" setup>
import {ElButton, ElForm, ElInput, ElScrollbar, FormInstance, FormRules} from "element-plus";
import PrimaryLayout from '../layouts/Header-Footer/PrimaryLayout.vue';
import {onMounted, ref} from 'vue';

const userRolesFormModel = ref({
  roles1_value: 'Участник',
  roles2_value: 'Участник',
});

const roles1 = [
  {
    roles1_value: 'Участник',
    roles1_label: 'Участник',
  },
  {
    roles1_value: 'Жюри',
    roles1_label: 'Жюри',
  },
  {
    roles1_value: 'Админ',
    roles1_label: 'Админ',
  },
]

const roles2 = [
  {
    roles2_value: 'Участник',
    roles2_label: 'Участник',
  },
  {
    roles2_value: 'Жюри',
    roles2_label: 'Жюри',
  },
  {
    roles2_value: 'Админ',
    roles2_label: 'Админ',
  },
]

const userRolesFormRef = ref<FormInstance>();

const saveUserRoles = () => {
  userRolesFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', userRolesFormModel.value);
      console.log(
          userRolesFormModel.value.roles1_value,
          userRolesFormModel.value.roles2_value,
      );
    } else {
      console.error('Form error');
      alert('Выберите роли пользователям!');
    }
  });
};

const finishedProjectsGradesFormModel = ref({
  grade1: '',
  grade2: '',
  grade3: '',
  grade4: '',
  grade5: '',
  grade6: '',
  grade7: '',
  grade8: '',
  grade9: '',
  grade10: '',
});

const finishedProjectsGradesFormRef = ref<FormInstance>();

const saveFinishedProjectsGrades = () => {
  finishedProjectsGradesFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', finishedProjectsGradesFormModel.value);
      console.log(
          finishedProjectsGradesFormModel.value.grade1,
          finishedProjectsGradesFormModel.value.grade2,
          finishedProjectsGradesFormModel.value.grade3,
          finishedProjectsGradesFormModel.value.grade4,
          finishedProjectsGradesFormModel.value.grade5,
          finishedProjectsGradesFormModel.value.grade6,
          finishedProjectsGradesFormModel.value.grade7,
          finishedProjectsGradesFormModel.value.grade8,
          finishedProjectsGradesFormModel.value.grade9,
          finishedProjectsGradesFormModel.value.grade10,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля с оценками!');
    }
  });
};

const value = ref(0);

const checkGradeCorrection = function(rule: any, value: any, callback: any) {
  const number = Number(value);
  if (isNaN(number)) {
    callback(new Error("Значение должно быть числом"));
  }
  else if (number < 1 || number > 50) {
    callback(new Error("Оценка только от 1 до 50"));
  }
}

const rules_grades: FormRules = {
  grade1: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade2: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade3: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade4: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade5: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade6: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade7: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade8: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade9: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade10: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
};

// С помощью этой залупы будут модальные окна команды открываться
onMounted(() => {
  const buttonOpenTeamInformation = document.querySelector('.button-open-team-information') as HTMLElement;
  const buttonCloseModalTeamInfoWindow = document.querySelector('.button-close-modal-team-info-window') as HTMLElement;
  const modalOverlayTeamInfoContainer = document.querySelector('.modal-overlay-team-info-container') as HTMLElement;

  const buttonOpenUserInformation = document.querySelector('.button-open-user-information') as HTMLElement;
  const buttonCloseModalUserInfoWindow = document.querySelector('.button-close-modal-user-info-window') as HTMLElement;
  const modalOverlayUserInfoContainer = document.querySelector('.modal-overlay-user-info-container') as HTMLElement;

  const overlayDarkenRestOfTheContent = document.querySelector('.overlay-darken-rest-of-the-content') as HTMLElement;

  if (!buttonOpenTeamInformation || !buttonCloseModalTeamInfoWindow || !modalOverlayTeamInfoContainer || !overlayDarkenRestOfTheContent) {
    console.error('One or more elements not found');
  } else {
    buttonOpenTeamInformation.addEventListener('click', () => {
      modalOverlayTeamInfoContainer.style.display = 'block';
      overlayDarkenRestOfTheContent.style.display = 'block';
    });

    buttonCloseModalTeamInfoWindow.addEventListener('click', () => {
      modalOverlayTeamInfoContainer.style.display = 'none';
      overlayDarkenRestOfTheContent.style.display = 'none';
    });
  }

  if (!buttonOpenUserInformation || !buttonCloseModalUserInfoWindow || !modalOverlayUserInfoContainer || !overlayDarkenRestOfTheContent) {
    console.error('One or more elements not found');
  } else {
    buttonOpenUserInformation.addEventListener('click', () => {
      modalOverlayUserInfoContainer.style.display = 'block';
      overlayDarkenRestOfTheContent.style.display = 'block';
    });

    buttonCloseModalUserInfoWindow.addEventListener('click', () => {
      modalOverlayUserInfoContainer.style.display = 'none';
      overlayDarkenRestOfTheContent.style.display = 'none';
    });
  }
});

const handleBeforeUpload = (file: File) => {
  const isLt2M = file.size / 1024 / 1024 < 2; // проверяем, меньше ли размер файла 2 МБ
  if (!isLt2M) {
    alert('Размер файла не должен превышать 2 МБ!');
  }
  return isLt2M; // если true, файл загружается; если false, загрузка отменяется
};

// ДАЛЬШЕ ИДЁТ КОД ДЛЯ МОДАЛЬНЫХ ОКОН

//ДЛЯ КОМАНД
const teamInformationFormModel = ref({
  team_lead_fio: '',
  team_lead_email: '',
  team_lead_number: '',
  team_lead_vuz: '',
  team_lead_vuz_direction: '',
  team_lead_vuz_code: '',
  team_lead_value_courses: '',
  mentor_fio: '',
  mentor_email: '',
  mentor_number: '',
  team_name: '',
  team_description: '',
  team_member_fio: '',
  team_member_email: '',
  team_member_number: '',
  team_member_vuz_direction: '',
  team_member_vuz_code: '',
  team_member_value_courses: '',
  files: [] as File[],
});

const rules_teams: FormRules = {
  team_lead_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  team_lead_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  team_lead_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  team_lead_vuz: [
    { required: true, message: 'Пожалуйста, введите название ВУЗа', trigger: 'blur' },
  ],
  team_lead_vuz_direction: [
    { required: true, message: 'Пожалуйста, введите направление', trigger: 'blur' },
  ],
  team_lead_vuz_code: [
    { required: true, message: 'Пожалуйста, введите код направления', trigger: 'blur' },
    { type: 'pattern', pattern: /^\d{2}\.\d{2}\.\d{2}$/, message: 'Формат должен быть вида XX.XX.XX', trigger: ['blur', 'change'] }
  ],
  team_lead_value_courses: [
    { required: true, message: 'Пожалуйста, выберите курс', trigger: 'change' }
  ],
  mentor_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  mentor_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  mentor_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  team_name: [
    { required: true, message: 'Пожалуйста, введите название команды', trigger: 'blur' },
  ],
  team_description: [ // А надо ли? Может описание опциональным будет?
    { required: true, message: 'Пожалуйста, введите описание команды', trigger: 'blur' },
  ],
  team_member_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  team_member_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  team_member_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  team_member_vuz_direction: [
    { required: true, message: 'Пожалуйста, введите направление', trigger: 'blur' },
  ],
  team_member_vuz_code: [
    { required: true, message: 'Пожалуйста, введите код направления', trigger: 'blur' },
    { type: 'pattern', pattern: /^\d{2}\.\d{2}\.\d{2}$/, message: 'Формат должен быть вида XX.XX.XX', trigger: ['blur', 'change'] }
  ],
  team_member_value_courses: [
    { required: true, message: 'Пожалуйста, выберите курс', trigger: 'change' }
  ],
};

const team_lead_courses = [
  {
    team_lead_value_courses: '1',
    team_lead_label_courses: '1',
  },
  {
    team_lead_value_courses: '2',
    team_lead_label_courses: '2',
  },
  {
    team_lead_value_courses: '3',
    team_lead_label_courses: '3',
  },
  {
    team_lead_value_courses: '4',
    team_lead_label_courses: '4',
  },
]

const team_member_courses = [
  {
    team_member_value_courses: '1',
    team_member_label_courses: '1',
  },
  {
    team_member_value_courses: '2',
    team_member_label_courses: '2',
  },
  {
    team_member_value_courses: '3',
    team_member_label_courses: '3',
  },
  {
    team_member_value_courses: '4',
    team_member_label_courses: '4',
  },
]

const teamInformationFormRef = ref<FormInstance>();

const saveTeamInformationChanges = () => { // Здесь данные формы отправляются
  teamInformationFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', teamInformationFormModel.value);
      console.log(
          teamInformationFormModel.value.team_lead_fio,
          teamInformationFormModel.value.team_lead_email,
          '7' + teamInformationFormModel.value.team_lead_number, // эти семёрки я добавляю потому что отправляются номера телефонов....
          teamInformationFormModel.value.team_lead_vuz,
          teamInformationFormModel.value.vuz_direction,
          teamInformationFormModel.value.code,
          teamInformationFormModel.value.value_courses,
          teamInformationFormModel.value.mentor_fio,
          teamInformationFormModel.value.mentor_email,
          '7' + teamInformationFormModel.value.mentor_number,
          teamInformationFormModel.value.team_member_fio,
          teamInformationFormModel.value.team_member_email,
          '7' + teamInformationFormModel.value.team_member_number,
          teamInformationFormModel.value.team_name,
          teamInformationFormModel.value.team_description,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля!');
    }
  });
};

//ДЛЯ ПОЛЬЗОВАТЕЛЕЙ
const userInformationFormModel = ref({
  user_info_fio: '',
  user_info_email: '',
  user_info_number: '',
  user_info_password: '',
  user_info_vuz: '',
  user_info_vuz_direction: '',
  user_info_vuz_code: '',
  user_info_value_courses: '',
  files: [] as File[],
});

const userInformationFormRef = ref<FormInstance>();

const saveUserInformationChanges = () => {
  userInformationFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', userInformationFormModel.value);
      console.log(
          userInformationFormModel.value.user_info_fio,
          userInformationFormModel.value.user_info_email,
          userInformationFormModel.value.user_info_number,
          userInformationFormModel.value.user_info_password,
          userInformationFormModel.value.user_info_vuz,
          userInformationFormModel.value.user_info_vuz_direction,
          userInformationFormModel.value.user_info_vuz_code,
          userInformationFormModel.value.user_info_value_courses,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля!');
    }
  });
};

const user_info_courses = [
  {
    user_info_value_courses: '1',
    user_info_label_courses: '1',
  },
  {
    user_info_value_courses: '2',
    user_info_label_courses: '2',
  },
  {
    user_info_value_courses: '3',
    user_info_label_courses: '3',
  },
  {
    user_info_value_courses: '4',
    user_info_label_courses: '4',
  },
]

const rules_users: FormRules = {
  user_info_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  user_info_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  user_info_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  user_info_vuz: [
    { required: true, message: 'Пожалуйста, введите название ВУЗа', trigger: 'blur' },
  ],
  user_info_password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
  ],
  user_info_vuz_direction: [
    { required: true, message: 'Пожалуйста, введите направление', trigger: 'blur' },
  ],
  user_info_vuz_code: [
    { required: true, message: 'Пожалуйста, введите код направления', trigger: 'blur' },
    { type: 'pattern', pattern: /^\d{2}\.\d{2}\.\d{2}$/, message: 'Формат должен быть вида XX.XX.XX', trigger: ['blur', 'change'] }
  ],
  user_info_value_courses: [
    { required: true, message: 'Пожалуйста, выберите курс', trigger: 'change' }
  ],
};
</script>


<style scoped>
.scrollbar-content {
  outline: 1px solid #d5d5d5;
  padding: 5px;
  border-radius: 2%;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper .wrapper__main-container {
  color: black;
  margin: 5% auto;
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  border-radius: 2%;
}

.main-container-name {
  padding-bottom: 20px;
}

.content-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, auto);
  grid-template-areas:
        "team-list-container user-list-container finished-projects-container";
  text-align: center;
}

.team-list-container__name, .user-list-container__name, .finished-projects-container__name {
  margin-bottom: 20px;
}

/* GRID AREA STREET NIGGA */
.team-list-container {
  grid-area: team-list-container;
}

.user-list-container {
  grid-area: user-list-container;
}

.finished-projects-container {
  grid-area: finished-projects-container;
}
/* END OF GRID AREA STREET */

.download-finished-project-button {
  margin-left: 15px;
}

.team-item, .user-item, .finished-project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: #ededed;
}

.grade-item, .roles1_value, .roles2_value {
  position: relative;
  top: 9px;
}

.roles1_value, .roles2_value {
  margin-left: 10px;
}

.button-open-user-information {
  margin-left: 15px;
}

.button-open-team-information {
  margin-left: 15px;
}

.team-item:last-child, .user-item:last-child, .finished-project-item:last-child {
  margin-bottom: 0;
}

.team-item:first-child, .user-item:first-child, .finished-project-item:first-child {
  margin-top: 0;
}

.input-grade {
  width: 70px;
  margin-left: 15px;
}

.button-container-users {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-container-grades {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.overlay-darken-rest-of-the-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Затемнение */
  z-index: 2;
  display: none;
}

.button-confirm-users, .button-cancel-users {
  width: 100%;
}

.button-confirm-grades, .button-cancel-grades {
  width: 100%;
}

/* МОДАЛЬНОЕ ОКНО КОМАНД */
.modal-team-info-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-confirm-modal-team-info, .button-cancel-modal-team-info {
  width: 185px;
}

.modal-overlay-team-info-container {
  position: fixed;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.modal-overlay-team-info-container__visible-content {
  position: relative;
  color: black;
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  border-radius: 2%;
}

.button-close-modal-team-info-window {
  position: absolute;
  top: 10px;
  right: 10px;
}

.teamInformation-form {
  display: grid;
  text-align: center;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
}

.teamInformation-form-info-container-name {
  margin-bottom: 20px;
}

.teamInformation-form__container .upload-files-button {
  margin-bottom: 0;
}

/* МОДАЛЬНОЕ ОКНО ПОЛЬЗОВАТЕЛЕЙ */
.modal-user-info-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-confirm-modal-user-info, .button-cancel-modal-user-info {
  width: 185px;
}

.modal-overlay-user-info-container {
  position: fixed;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.modal-overlay-user-info-container__visible-content {
  position: relative;
  color: black;
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  border-radius: 2%;
}

.button-close-modal-user-info-window {
  position: absolute;
  top: 10px;
  right: 10px;
}

.userInformation-form__container .upload-files-button {
  margin-bottom: 0;
}

.userInformation-form {
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(2, 1fr);
}

.userInformation-form-info-container-name {
  margin-bottom: 20px;
}

/* MEDIA GANG STREET */
@media (max-width: 1365px) {
  .content-container {
    grid-template-columns: repeat(2, auto);
    grid-template-areas:
        "team-list-container user-list-container"
        "finished-projects-container finished-projects-container";
  }
}

@media (max-width: 952px) {
  .content-container {
    display: block;
  }

  .user-list-container {
    margin-top: 20px;
  }

  .finished-projects-container {
    margin-top: 20px;
  }
}
</style>