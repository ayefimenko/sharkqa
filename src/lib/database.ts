import { supabase } from './supabase'

export class UserService {
  static async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  }

  static async getUsers(role?: string) {
    let query = supabase.from('profiles').select('*')
    
    if (role) {
      query = query.eq('role', role)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching users:', error)
      return []
    }

    return data
  }
}

export class CourseService {
  static async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching courses:', error)
      return []
    }

    return data
  }

  static async getCourse(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()

    if (error) {
      console.error('Error fetching course:', error)
      return null
    }

    return data
  }
}

export class PathService {
  static async getPaths() {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching paths:', error)
      return []
    }

    return data
  }
}

export class EnrollmentService {
  static async enrollStudent(studentId: string, pathId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: studentId,
        path_id: pathId,
        progress_percentage: 0
      })
      .select()
      .single()

    if (error) {
      console.error('Error enrolling student:', error)
      return null
    }

    return data
  }
}
