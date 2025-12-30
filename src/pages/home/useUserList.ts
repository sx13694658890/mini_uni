import type { IUserList } from '~/api'
import { useToggle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { fetchFamilyList } from '~/api/modules/mine'
import { useUserStore } from '~/store'

export function useUserList() {
  const [familyModalShow, toggleFamilyModalShow] = useToggle(false)
  const { getCurrentBindPatientUser, currentPatientUserId } = useUserStore()
  const userList = ref<IUserList[]>([])
  const list = computed(() => {
    return userList.value.map((item) => {
      return {
        ...item,
        isSelf: `${item.relation}` === '0',
      }
    })
  })

  async function getUserList() {
    const res = await fetchFamilyList()

    userList.value = res
  }

  function handleOpenFamilyModal() {
    getUserList()
    toggleFamilyModalShow(true)
  }

  function handleConfirmUser(id: string) {
    if (!id) {
      return
    }
    getCurrentBindPatientUser(id)
    toggleFamilyModalShow(false)
  }

  return {
    familyModalShow,
    list,
    currentUser: currentPatientUserId,
    handleOpenFamilyModal,
    handleConfirmUser,
  }
}
